import React, { Component } from "react";
import Select from 'react-select';
import ClipLoader from 'react-spinners/ClipLoader';
// import GridLoader from 'react-spinners/GridLoader';
// import CircleLoader from 'react-spinners/CircleLoader';

// import ReactLoading from 'react-loading';
// import ReactList from 'react-list';
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
// import './BootstrapTable/BootstrapTable/dist/react-bootstrap-table-all.min.css';
// import '/react-bootstrap-table/css/react-bootstrap-table-all.min.css';

var axiosInstance = axios.create({
  baseURL: 'http://portal.bimetehran.com/Home/',
  // baseURL: 'http://localhost:47002/Home/',
  /* other custom settings */
});
// const Tablelist = [];
const Countryoptions = [];
const TravelAgeoptions = [];
const TravelDurationoptions = [];
const loadingcss = `
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class Travel extends Component {

  componentWillMount() {
    this.getCountryOptions(1);
    this.getTravelAgeoptions();
    this.getTravelDurationoptions();
    //this.loadTablelist();
  }
  componentDidMount() {
  }
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      selectedCountry: null,
      // selectedCountryMap: {},
      Countryoptions,
      selectedTravelAge: null,
      // selectedTravelAgeMap: {},
      TravelAgeoptions,
      selectedTravelDuration: null,
      // selectedTravelDurationMap: {},
      TravelDurationoptions,
      CountryStatus: 1,
      Tablelist: []
    }
    this.handleChangeCountry = (selectedCountry) => {
      this.setState({ selectedCountry });
      //console.log(`selected:`, selectedCountry);
    }
    this.handleChangeTravelAge = (selectedTravelAge) => {
      this.setState({ selectedTravelAge });
      //console.log(`selected:`, selectedCountry);
    }
    this.handleChangeTravelDuration = (selectedTravelDuration) => {
      this.setState({ selectedTravelDuration });
      //console.log(`selected:`, selectedCountry);
    }
    this.handleClick = () => {
      this.getTarefe()
      // this.setState({ selectedTravelDuration });
      //console.log(`selected:`, selectedCountry);
    }
    this.handleChangeTravelTo = () => {
      var CountryStatus = 1;
      if (this.state.CountryStatus === 1) {
        CountryStatus = 2
      } else {
        CountryStatus = 1
      }
      this.setState({ CountryStatus });
      this.getCountryOptions(CountryStatus)
    }
    this.getTarefe = () => {
      this.setState({ loading: true });
      const vm = {
        CountryID: this.state.selectedCountry.value,
        CountryMap: this.state.selectedCountry,
        // CountryMap: this.state.Countryoptions.filter(elm => elm.CountryID === this.state.selectedCountry.value),
        TravelDurationMap: this.state.selectedTravelDuration,
        TravelAgeMap: this.state.selectedTravelAge
      };
      console.log(vm);
      this.setState({ Tablelist: [] });
      axiosInstance.post('TarefeTravelCompanyTb_List', vm)
        .then((response) => {
          this.setState({ Tablelist: response.data.CompanyMaps });
          //console.log('Tablelist', response.data.CompanyMaps);
          //const Countryoptions = response.data.map(item => ({ value: item.CountryID, label: item.CountryTitle }));
          // if (response.data.Sucsess) {
          //   // if (response.data.CompanyMaps.length > 0) {
          //   // }
          // }
          this.setState({ loading: false });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    this.getCountryOptions = (CountryStatus) => {
      axiosInstance.post('Country_List', { CountryStatus: CountryStatus })
        .then((response) => {
          const Countryoptions = response.data.map(item => ({ value: item.CountryID, label: item.CountryTitle, CountryID: item.CountryID, CountryTitle: item.CountryTitle, CountryDarsad: item.CountryDarsad }));
          if (Countryoptions.length > 0) {
            this.setState({ selectedCountry: Countryoptions[0] });
          }
          this.setState({ Countryoptions: Countryoptions });
          // console.log('CountryStatus', CountryStatus);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    this.getTravelAgeoptions = () => {
      axiosInstance.post('TravelAge_List', {})
        .then((response) => {
          const TravelAgeoptions = response.data.map(item => ({ value: item.TravelAgeID, label: item.TravelAgeTitle, TravelAgeID: item.TravelAgeID, TravelAgeTitle: item.TravelAgeTitle, TravelAgeDarsad: item.TravelAgeDarsad }));
          if (TravelAgeoptions.length > 0) {
            this.setState({ selectedTravelAge: TravelAgeoptions[0] });
          }
          this.setState({ TravelAgeoptions: TravelAgeoptions });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    this.getTravelDurationoptions = () => {
      axiosInstance.post('TravelDuration_List', {})
        .then((response) => {
          const TravelDurationoptions = response.data.map(item => ({ value: item.TravelDurationID, label: item.TravelDurationTitle, TravelDurationID: item.TravelDurationID, TravelDurationTitle: item.TravelDurationTitle, Darsad: item.Darsad }));
          if (TravelDurationoptions.length > 0) {
            this.setState({ selectedTravelDuration: TravelDurationoptions[0] });
          }
          this.setState({ TravelDurationoptions: TravelDurationoptions });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  render() {
    // const { selectedCountry } = this.state;
    return (
      <div>
        <div className="container margintop10">
          <div className="document-title">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#/">صفحه اصلی</a></li>
                <li className="breadcrumb-item" aria-current="page"> استعلام قیمت بیمه مسافرتی</li>
              </ol>
            </nav>
            <div>
              <div>

              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="col-md-12">
            <div className="col-md-12">
              <div className="col-md-3">
                <div className="form-group">
                  <label className="form-label">سفر به:  </label>
                  <div className="row-fluid">
                    <div className="radio-success" onChange={this.handleChangeTravelTo.bind(this)}>
                      <input id="rbtnTravelTo1" name="rbtnTravelTo" type="radio" value="1" defaultChecked="checked" />
                      <label htmlFor="rbtnTravelTo1">یک کشور </label>
                      <input id="rbtnTravelTo0" name="rbtnTravelTo" type="radio" value="2" />
                      <label htmlFor="rbtnTravelTo0">بیش از یک کشور</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <label className="form-label">کشور مقصد:</label><span className="text-danger"> *</span>
                  <div className="controls">
                    <Select
                      key="cmbCountryID"
                      value={this.state.selectedCountry}
                      onChange={this.handleChangeCountry}
                      options={this.state.Countryoptions}
                      placeholder="بارگزاری"
                    // defaultValue={{ label: "انتخاب کشور", value: 0 }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label className="form-label">مدت سفر (اعتبار بیمه نامه)</label><span className="text-danger"> *</span>
                  <div className="controls">
                    <Select
                      key="cmbTravelDurationID"
                      value={this.state.selectedTravelDuration}
                      onChange={this.handleChangeTravelDuration}
                      options={this.state.TravelDurationoptions}
                      placeholder="بارگزاری"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <label className="form-label">سن مسافر</label><span className="text-danger"> *</span>
                  <div className="controls">
                    <Select
                      key="cmbTravelAgeID"
                      value={this.state.selectedTravelAge}
                      onChange={this.handleChangeTravelAge}
                      options={this.state.TravelAgeoptions}
                      placeholder="بارگزاری"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-2 form-group">
                <label className="form-label" style={{ visibility: 'hidden' }}>استعلام</label>
                <button type="button" className="btn btn-warning" id="btnSearchTarefeh" onClick={this.handleClick}>جستجو قیمت</button>
              </div>
            </div>
          </div>
          <div id="CompanyBime" className="col-md-12">
            <h3>شرکت های بیمه</h3>
            <BootstrapTable bootstrap4 data={this.state.Tablelist} version='4' bordered={false}
              options={{ noDataText: ' ' }}>
              <TableHeaderColumn width='50' isKey dataField='CompanyID'>#</TableHeaderColumn>
              <TableHeaderColumn dataField='CompanyTitle'>نام شرکت</TableHeaderColumn>
              <TableHeaderColumn width='150' dataField='NerkhPayeStr'>تعرفه</TableHeaderColumn>
            </BootstrapTable>
            <div className='sweet-loading'>
              <ClipLoader className={loadingcss}
                sizeUnit={"px"} size={150} color={'#123abc'}
                loading={this.state.loading} />
            </div>
            {/* <ReactList
                    itemRenderer={this.renderItem}
                    length={this.state.Tablelist.length}
                    type='uniform'
                  /> */}
          </div>
        </div>
        <div className="container margintop10 col-md-12">
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <a className="nav-item nav-link active" href="#about-third-party" data-toggle="tab" aria-controls="nav-home" aria-selected="true">درباره بیمه مسافرتی</a>
            <a className="nav-item nav-link" data-toggle="tab" href="#faq" id="btnview" aria-controls="nav-home" aria-selected="false">سوالات متداول</a>
          </div>
          <div className="tab-content margintop10">
            <div id="about-third-party" className="tab-pane fade show active">
              <h1 id="بیمه مسافرتی"><span className="p-icon"><img src="http://portal.bimetehran.com/images/static/travel/travel-insurance.png" alt="بیمه مسافرتی" /></span><span>بیمه مسافرتی</span></h1>
              <p><span>تابه‌حال به تهدیدات سفرهای خارجی فکر کرده‌اید؟ بیماری‌های ناشی از تغییر آب‌وهوا، دریازدگی، مسمومیت ناشی از غذاهای خارجی، سرماخوردگی شدید در مناطق سردسیر و... این‌ها تازه فقط تهدیدات مربوط به سلامت مسافر است. احتمال گم شدن مدارک شناسایی، گم شدن یا تأخیر بار، بروز مشکل حقوقی در صورت عدم رعایت قوانین و... از جمله مسائلی هستند که ممکن است گریبان‌گیر شما شوند. بروز این مشکلات در سفرهای خارجی با توجه به ناآشنا بودن مسافر به محیط و شاید زبان آنجا می‌تواند خیلی نگران‌کننده باشد. بیمه مسافرتی می‌تواند راه حل خوبی برای مقابله با این تهدیدها باشد.</span></p>

              <h2 id="بیمه مسافرتی  چیست"><span>بیمه مسافرتی  چیست؟</span></h2>
              <p>
                <span>
                  بیمه مسافرتی از بیمه‌گزاران در برابر حوادث احتمالی سفر محافظت می‌کند. این بیمه برای اخذ ویزا از بعضی سفارت‌خانه‌ها الزامی است و برای سایر سفارت‌خانه‌ها نیز توصیه می‌شود.
                  با توجه به اختلاف نرخ ارز در کشور ما و اکثر کشورهای خارجی، هزینه‌های درمان در این کشورها بسیار گران است. اگر بیمه‌گزار در صورت بروز حادثه بخواهد هزینه را آزاد پرداخت کند، ممکن است یک سرماخوردگی ساده هزینه‌های سنگینی را برای وی رقم بزند. مشکل بزرگ‌تر می‌تواند این باشد که بیمه‌گزار هزینه درمان خود را همراه نداشته باشد!!!
                  تصور کنید چمدان شما که حاوی وسایل ضروری سفر است مفقود شود. مخصوصاً اگر بدون آن وسایل، ادامه سفر دشوار باشد. اگر بیمه مسافرتی داشته باشید، می‌توانید هزینه خسارت مفقود شدن بار خود را از بیمه بگیرید.
                  بنابراین رسیدن به این نتیجه چندان دور از ذهن نیست که بیمه مسافرتی مزایای زیادی برای بیمه‌گزاران ایجاد می‌کند و تهیه کردن آن برای سفرهای خارج از کشور امری حیاتی است.
                    </span>
              </p>
              <h2 id="شرکت‌های کمک‌رسان و نحوه دریافت خسارت"><span className="p-icon"><img src="http://portal.bimetehran.com/images/static/travel/assistant.png" alt="کمک رسان در بیمه مسافرتی" /></span><span>
                <a href="">شرکت‌های کمک‌رسان</a> و نحوه دریافت خسارت</span></h2>
              <p>
                <span>
                  شرکت‌های ایرانی بیمه، خارج از ایران شعبه ندارند و نمی‌توانند خدمات ارائه دهند؛ به همین منظور با شرکت‌هایی به نام کمک‌رسان قرارداد دارند. درواقع این شرکت‌های کمک‌رسان هستند که به بیمه‌گزاران بیمه مسافرتی خدمات ارائه می‌دهند. هریک از شرکت‌های بیمه با یک یا تعدادی از شرکت‌های کمک‌رسان قرارداد دارند.
                  بعضی از شرکت‌های کمک‌رسان عبارتند از:
                    </span>
              </p>
              <ol>
                <li><p><span>Mideast</span></p></li>
                <li><p><span>Allianz</span></p></li>
                <li><p><span>Evasan</span></p></li>
                <li><p>...</p></li>
              </ol>

              <h2><span className="p-icon"><img src="http://portal.bimetehran.com/images/static/travel/tracking.png" alt="پیگیری خسارت در بیمه مسافرتی" /></span><span>نحوه پیگیری خسارت در محل حادثه</span></h2>
              <p>
                <span>
                  نحوه پیگیری خسارت معمولاً بدین صورت است که موقع بروز حادثه، بیمه‌گزار باید با شماره‌ای که روی
                        <a target="_blank">بیمه‌نامه مسافرتی</a> خود درج شده است، تماس بگیرد؛ نام، شماره بیمه‌نامه و مدت اعتبار آن را بگوید و حادثه اتفاق افتاده را شرح دهد. طبق حادثه‌ای که رخ‌ داده شرکت کمک‌رسان اقدامات لازم را انجام می‌دهد. بعضی از شرکت‌های کمک‌رسان این خدمات را ندارند و بیمه‌گزار باید شخصاً خسارت خود را پیگیری و پرداخت هزینه کند؛ سپس با ارائه صورتحساب‌های پرداخت‌شده در سفر، هزینه خسارت‌های تحت پوشش بیمه مسافرتی را از کشور محل اقامت خود دریافت کند.
                    </span>
              </p>
              <h2><span className="p-icon"><img src="http://portal.bimetehran.com/images/static/travel/payment.png" alt="پرداخت خسارت در بیمه مسافرتی" /></span><span>نحوه پرداخت خسارت</span></h2>
              <p><span>نحوه پرداخت هزینه شرکت‌های کمک‌رسان در سفر دو نوع است؛ در یک حالت این شرکت‌ها با ارگانی که بیمه‌گزار برای رفع خسارت با آن سروکار دارد (مثل بیمارستان و...) ارتباط برقرار می‌کنند و هزینه خسارت را مستقیم با آنجا حساب می‌کنند. برای مثال اگر بیمه‌گزاری در سفر دچار آسیب جسمی شود و او را به بیمارستان منتقل کنند، شرکت کمک‌رسان هزینه درمان او را مستقیم با بیمارستان حساب می‌کند.</span></p>
              <p><span>در حالتی دیگر شرکت کمک‌رسان هزینه خسارت واردشده را در صورت امکان به حساب بیمه‌گزار واریز می‌کند. برای مثال اگر هواپیمای بیمه‌گزاری 12 ساعت تأخیر داشته باشد، بسته به اینکه تحت پوشش کدام شرکت بیمه باشد، بین 90 تا 100 یورو خسارت باید دریافت کند. در این حالت شرکت کمک‌رسان این هزینه را در صورت امکان به حساب بیمه‌گزار واریز می‌کند.</span></p>
              <p><span>درصورتی‌که بیمه‌گزار به دلایلی نتواند یا نخواهد هزینه خسارت خود را از شرکت کمک‌رسان در سفر دریافت کند، می‌تواند این هزینه را خود پرداخت کرده و با ارائه مدارک لازم، هزینه را در کشور محل اقامت خود دریافت کند.</span></p>
              <p><span>این مدارک شامل بیمه‌نامه و صورتحساب‌های پرداخت‌شده مورد تأیید ارگان (های) ذی‌ربط است. </span></p>
              <p><span>یکی از عوامل قابل توجه درباره شرکت‌های کمک‌رسان اپراتور فارسی‌زبان است. تصور کنید در سفر دچار حادثه‌ای شدید و می‌خواهید از خدمات بیمه مسافرتی خود استفاده کنید. باید با شماره‌ای که روی بیمه‌نامه خود درج شده تماس بگیرید و اتفاق رخ داده را شرح دهید. حال اگر قادر نباشید به خوبی واقعه رخ داده را به انگلیسی برای اپراتور شرکت کمک‌رسان توضیح دهید و شرکت کمک‌رسان هم اپراتور فارسی‌زبان نداشته باشد، قطعاً دچار مشکل خواهید شد و نمی‌توانید از شرکت کمک‌رسان خدماتی دریافت کنید.</span></p>
              <p><span>شرکت Mideast دارای اپراتور فارسی‌زبان و شرکت Allianz فاقد آن است.</span></p>

              <h2 id="پوشش‌های بیمه مسافرتی">
                <span className="p-icon"><img src="http://portal.bimetehran.com/images/static/travel/cover.png" alt="پوشش‌های بیمه مسافرتی" /></span><span>
                  <a >پوشش‌های بیمه مسافرتی</a>
                </span>
              </h2>
              <p>
                <span>
                  خساراتی که در صورت وقوع، بیمه مسافرتی از بیمه گزار حمایت می‌کند، پوشش نام دارد. این پوشش‌ها توصیف می‌کند که در صورت وقوع چه حوادثی، شرکت‌های بیمه چه خدماتی به بیمه‌گزاران ارائه می‌دهند.
                  بسته به اینکه بیمه مسافرتی را از کدام شرکت بیمه تهیه و از کدام طرح آن استفاده کنید، پوشش‌ها ممکن است متفاوت باشند. موارد زیر تمام پوشش‌هایی است که یک شرکت بیمه می‌تواند ارائه دهد:
                    </span>
              </p>
              <h3 id="هزینه‌های پزشکی و بستری شدن هنگام بروز حادثه"><span className="p-icon"><img src="http://portal.bimetehran.com/images/static/travel/treatment.png" alt="درمان در بیمه مسافرتی" /></span><span>هزینه‌های پزشکی و بستری شدن هنگام بروز حادثه</span></h3>
              <p>
                <span>
                  با داشتن بیمه مسافرتی می‌توان از بابت هزینه‌های ناشی از بیماری یا حادثه‌ی خاصی که در سفر رخ می‌دهد، آسوده‌خاطر بود. شرکت کمک‌رسان تا سقف تعهدات (که در بیمه‌نامه قیدشده) هزینه‌های مربوط به درمان، بستری شدن، معاینه، جراحی و... را متقبل می‌شود.
                  این پوشش غالباً دارای فرانشیز است. طبق آمار سایت رسمی شرکت‌های بیمه سامان، پارسیان و پاسارگاد، فرانشیز این پوشش در این شرکت‌ها 25 یورو است. در موارد صدمات جسمی حاد یا بستری شدن بیش از 24 ساعت، این پوشش فاقد فرانشیز است.
                  برای مثال اگر شخصی در سفر دچار صدمه‌ای جسمی شود که 150 یورو هزینه داشته باشد، درصورتی‌که جزو موارد استثنا نباشد، 125 یورو از هزینه به عهده شرکت بیمه و 25 یورو به عهده بیمه‌گزار است.
                    </span>
              </p>

              <h3 id="انتقال یا بازگرداندن بیمه‌گزار به کشورش در صورت بروز حادثه"><span className="p-icon"><img src="http://portal.bimetehran.com/images/static/travel/transfer.png" alt="انتقال بیمه گزار در بیمه مسافرتی" /></span><span>انتقال یا بازگرداندن بیمه‌گزار به کشورش در صورت بروز حادثه</span></h3>
              <p>
                <span>
                  در صورت وقوع بیماری یا حادثه برای بیمه‌گزار، شرکت کمک‌رسان موظف است اقدامات لازم را برای انتقال بیمار به یک بیمارستان یا مرکز درمانی و یا بازگرداندن او به کشورش انجام دهد.
                  با توجه به وضعیت بیمه‌گزار آسیب‌دیده، شرکت کمک‌رسان در مورد بازگرداندن وی به کشورش یا مداوای او در محل تصمیم‌گیری می‌کنند. اگر آسیب ضروری باشد یا بنا به تشخیص تیم پزشکی نیازی به بازگرداندن بیمه‌گزار نباشد، نسبت به انتقال بیمه‌گزار به یک مرکز درمانی مجهز و درمانش اقدامات لازم را انجام می‌دهند.
                    </span>
              </p>
              <p><span>همچنین برای انتقال بیمه‌گزار شرکت کمک‌رسان موظف است با برقراری تماس تلفنی با پزشک معالج بیمار، از مناسب‌ترین روش برای انتقالش استفاده کند.</span></p>

              <h3 id="هزینه‌های ضروری دندان‌پزشکی"><span className="p-icon"><img src="http://portal.bimetehran.com/images/static/travel/tooth.png" alt="دندان پزشکی در بیمه مسافرتی" /></span><span>هزینه‌های ضروری دندان‌پزشکی</span></h3>
              <p>
                <span>
                  بیمه مسافرتی هزینه‌های درمان مشکل دندان را تا سقف مقرر (که در بیمه‌نامه ذکر شده) پرداخت می‌کند. این هزینه‌ها اغلب شامل معالجه دندان‌درد، درمان عفونت و کشیدن دندان است.
                  طبق اعلام بیمه سامان، پارسیان و پاسارگاد از سایت رسمی، فرانشیز این پوشش 25 یورو است.
                  مثلاً اگر بیمه‌گزار دچار عفونت دندان شود و مبلغ 100 یورو بابت درمان آن بپردازد، 25 یورو از هزینه را بیمه‌گزار و 75 یورو از آن را شرکت کمک‌رسان تقبل می‌کند.
                    </span>
              </p>


              <h3 id="بازگشت اعضای درجه 1 خانواده به همراه بیمه‌گزار"><span className="p-icon"><img src="http://portal.bimetehran.com/images/static/travel/member-return.png" alt="بازگشت اعضا خانواده در بیمه مسافرتی" /></span><span>بازگشت اعضای درجه 1 خانواده به همراه بیمه‌گزار</span></h3>
              <p>
                <span>
                  اگر شخص بیمه‌گزار فوت کند یا دچار بیماری شود که به بیش از 10 روز بستری شدن نیاز داشته باشد، شرکت کمک‌رسان هزینه بازگشت یکی از همراهان درجه اول بیمه‌گزار را پرداخت می‌کند؛ به شرطی که فرد همراه، قادر به بازگشت با وسیله نقلیه خود یا وسیله از قبل تعیین‌شده نباشد.
                    </span>
              </p>


              <h3 id="بازگرداندن جسد بیمه‌گزار به ایران در صورت فوت"><span className="p-icon"><img src="http://portal.bimetehran.com/images/static/travel/corpse.png" alt="بازگشت جسد بیمه گزار در بیمه مسافرتی" /></span><span>بازگرداندن جسد بیمه‌گزار به ایران در صورت فوت</span></h3>
              <p>
                <span>
                  در صورت فوت بیمه‌گزار در سفر، شرکت کمک‌رسان اقدامات لازم را برای انتقال جسد وی به کشور محل اقامت انجام می‌دهد و هزینه‌های موردنیاز را تقبل می‌کند. بیمه مسافرتی در برابر هزینه خاک‌سپاری یا مراسم ترحیم، هزینه‌ای پرداخت نمی‌کند.
                    </span>
              </p>

              <h3 id="انتقال اضطراری یکی از اعضای درجه یک خانواده بیمه‌گزار"><span className="p-icon"><img src="http://portal.bimetehran.com/images/static/travel/transfer2.png" alt="انتقال اعضای خانواده بیمه گزار در بیمه مسافرتی" /></span><span>انتقال اضطراری یکی از اعضای درجه یک خانواده بیمه‌گزار</span></h3>
              <p>
                <span>
                  اگر بیمه‌گزار دچار بیماری شود که بیش از 10 روز نیاز به بستری شدن داشته باشد، شرکت بیمه هزینه‌ی رفت‌وآمد و اقامت یکی از اعضای درجه‌ یک خانواده فرد را به محلی که بستری شده است، تقبل می‌کند. هزینه و مدت زمان اقامت فرد همراه در شرکت‌های مختلف بیمه دارای سقف متفاوتی است.
                    </span>
              </p>

              <h3 id="هزینه بازگشت بیمه‌گزار به کشورش به علت فوت اقوام"><span className="p-icon"><img src="http://portal.bimetehran.com/images/static/travel/relatives.png" alt="بازگشت اعضای بیمه گزار در بیمه مسافرتی" /></span><span>هزینه بازگشت بیمه‌گزار به کشورش به علت فوت اقوام</span></h3>
              <p>
                <span>
                  اگر یکی از اقوام بیمه‌گزار(تا درجه 2) حین سفر وی فوت کند و فرد بیمه‌گزار قادر نباشد با وسیله نقلیه خود یا وسیله‌ای که از قبل برای بازگشت رزرو کرده است، بازگردد؛ شرکت بیمه هزینه بازگشت بیمه‌گزار را پرداخت می‌کند. برای این پوشش طبق گفته شرکت بیمه‌های سامان، پارسیان و پاسارگاد، ارائه مدرکی برای اثبات فوت خویشاوند بیمه‌گزار (گواهی فوت و...) الزامی است.
                    </span>
              </p>

              <h3 id="هزینه‌های مربوط به تحویل دارو"><span className="p-icon"><img src="http://portal.bimetehran.com/images/static/travel/drug.png" alt="دارو در بیمه مسافرتی" /></span><span>هزینه‌های مربوط به تحویل دارو</span></h3>
              <p>
                <span>
                  درصورتی‌که داروهای ضروری بیمه‌گزار مفقود شود، حتی اگر این داروها قبل از سفر توسط پزشک تجویز شده باشد، شرکت بیمه هزینه ارسال دارو را برای بیمه‌گزار به‌طور کامل پرداخت می‌کند.
                    </span>
              </p>

              <h3 id="پیگیری‌ و پرداخت هزینه مسائل حقوقی"><span className="p-icon"><img src="http://portal.bimetehran.com/images/static/travel/legal.png" alt="مسائل حقوقی در بیمه مسافرتی" /></span><span>پیگیری‌ و پرداخت هزینه مسائل حقوقی</span></h3>
              <p>
                <span>
                  در حالتی که بیمه‌گزار از نظر حقوقی دچار مشکلی شود، شرکت‌های کمک‌رسان طبق شرایط بیمه‌نامه اقداماتی انجام می‌دهند.
                    </span>
              </p>
              <p>
                <span>
                  طبق صحبت تلفنی با کارشناس بیمه سامان، اگر شخصی تحت پوشش
                        <a target="_blank">بیمه مسافرتی سامان</a> باشد، درصورتی‌که در کشوری دیگر به خاطر رعایت نکردن قوانین شهری یا خسارت واردکردن به فرد دیگری به‌عنوان یک شهروند عادی تحت تعقیب قانون قرار گیرد، شرکت کمک‌رسان دفاع قانونی لازم را انجام می‌دهد. این شرکت هزینه‌های دفاع قانونی از بیمه‌گزار را (به‌جز مواردی که رعایت نکردن قانون یا خسارت وارد کردن توسط وسیله نقلیه‌ای باشد که مالک آن بیمه‌گزار باشد) تا سقف 1500 یورو پرداخت می‌کند.
                    </span>
              </p>
              <p>
                <span>
                  این بند در
                        <a target="_blank">بیمه مسافرتی پارسیان</a> متفاوت است. در این بیمه‌نامه درصورتی‌که بیمه‌گزار به فرد دیگری خسارت وارد کند، شرکت کمک‌رسان هزینه دفاع از بیمه‌گزار را تا سقف 1500 یورو پوشش می‌دهد.
                    </span>
              </p>
              <p>
                <span>
                  <a target="_blank">بیمه مسافرتی پاسارگاد </a>در این پوشش مطابق
                        <a target="_blank">بیمه مسافرتی پارسیان</a> اجرا می‌کند با این تفاوت که تا سقف 150 یورو هزینه‌ها را پوشش می‌دهد.
                    </span>
              </p>

              <h3 id="مفقود شدن یا به سرقت رفتن مدارک شناسایی"><span className="p-icon"><img src="http://portal.bimetehran.com/images/static/travel/documents.png" alt="مدارک شناسایی در بیمه مسافرتی" /></span><span>مفقود شدن یا به سرقت رفتن مدارک شناسایی</span></h3>
              <p>
                <span>
                  درصورتی‌که مدارک شناسایی بیمه‌گزار (پاسپورت، شناسنامه، گواهینامه و...) مفقود شود یا به سرقت رود، شرکت‌های کمک‌رسان هزینه‌های مربوط به صدور المثنی برای بیمه‌گزار را تا سقف مشخصی پرداخت می‌کنند. این سقف برای
                        <a target="_blank">بیمه مسافرتی سامان </a>، <a target="_blank">بیمه مسافرتی پارسیان</a> و
                        <a target="_blank">بیمه مسافرتی پاسارگاد</a> 200 یورو است.
                    </span>
              </p>

              <p><span><a target="_blank">بیمه مسافرتی سامان</a> علاوه بر تقبل هزینه تا سقف 200 یورو، اطلاعات لازم را نیز در اختیار ارگان‌های موردنیاز (کنسولگری، سفارت‌خانه و...) قرار می‌دهد.</span></p>

              <h3 id="حواله وجه نقد"><span className="p-icon"><img src="http://portal.bimetehran.com/images/static/travel/cash.png" alt="حواله پول در بیمه مسافرتی" /></span><span>حواله وجه نقد</span></h3>
              <p>
                <span>
                  درصورتی‌که وجه نقد بیمه‌گزار مفقود شود یا به سرقت برود، با ارائه مدارکی برای اثبات این موضوع (تأییدیه، رسید، شکایت‌نامه و...) می‌تواند تا سقف مشخصی از شرکت کمک‌رسان وجه نقد دریافت کند؛ به شرطی که بیمه‌گزار قبل از سفر در کشور محل اقامت، مبلغ موردنیاز را در قالب چک، حواله یا وجه نقد نزد دفتر رسمی بیمه بسپارد.
                    </span>
              </p>
              <p>
                <span>
                  این سقف مشخص در <a target="_blank">بیمه مسافرتی سامان</a>، <a target="_blank">بیمه مسافرتی پارسیان</a> و
                        <a target="_blank">بیمه مسافرتی پاسارگاد </a> 850 یورو است. برای مثال اگر تحت پوشش <a target="_blank">بیمه مسافرتی سامان</a>،
                        <a target="_blank">بیمه مسافرتی پارسیان</a> یا
                        <a target="_blank">بیمه مسافرتی پاسارگاد </a> باشید و پول خود را در سفر گم کنید؛ درصورتی‌که در ایران تا 850 یورو پول در قالب چک، وجه نقد یا حواله نزد شرکت بیمه سپرده باشید، شرکت کمک‌رسان مقدار پول گم‌شده شما را تا سقف 850 یورو به شما می‌دهد.
                    </span>
              </p>

              <h3 id="هزینه‌های ناشی از تأخیر در حرکت"><span className="p-icon"><img src="http://portal.bimetehran.com/images/static/travel/delay.png" alt="تاخیر در حرکت در بیمه مسافرتی" /></span><span>هزینه‌های ناشی از تأخیر در حرکت</span></h3>
              <p>
                <span>
                  درصورتی‌که وسیله نقلیه بیمه‌گزار بیش از حد مشخصی تأخیر داشته باشد، بیمه‌گزار می‌تواند هزینه‌های ضروری اضافی ایجادشده (حمل‌ونقل، اقامت، غذا و...) را تا سقف مشخصی به شرط ارائه صورتحساب، دریافت کند. سقف هزینه‌ها بستگی به میزان تأخیر وسیله نقلیه دارد.
                    </span>
              </p>
              <p>
                <span>
                  برای مثال برای <a target="_blank">بیمه مسافرتی سامان</a>، <a target="_blank">بیمه مسافرتی پارسیان</a> و
                        <a target="_blank">بیمه مسافرتی پاسارگاد</a> اگر وسیله نقلیه بیش از 6 ساعت تأخیر داشته باشد، طبق موارد زیر شرکت کمک‌رسان هزینه خسارات را پرداخت می‌کند:
                    </span>
              </p>
              <ul>
                <li><p><span>بین 6 تا 12 ساعت تأخیر، تا سقف 45 یورو هزینه‌های اضافی به وجود آمده را جبران می‌کند.</span></p></li>
                <li><p><span>بین 12 تا 18 ساعت تأخیر، تا سقف 90 یورو هزینه‌های اضافی به وجود آمده را جبران می‌کند.</span></p></li>
                <li><p><span>بین 18 تا 24 ساعت تأخیر، تا سقف 135یورو هزینه‌های اضافی به وجود آمده را جبران می‌کند.</span></p></li>
                <li>
                  <p>
                    <span>
                      بیش از 24 ساعت تأخیر، تا سقف 180 یورو هزینه‌های اضافی به وجود آمده را جبران می‌کند.
                      سقف پرداخت این شرکت‌ها بابت این خسارت، 180 یورو است.
                            </span>
                  </p>
                </li>
              </ul>
              <p><span>طبق گفته سایت رسمی بیمه‌های سامان، پارسیان و پاسارگاد، این هزینه به شرط برقراری بندهای زیر پرداخت می‌شود:</span></p>
              <ul>
                <li><p><span>تأخیر به دلیل اعتصاب کارگران فرودگاه، شرکت‌های خدماتی یا شرکت‌های هواپیمایی شامل این پوشش نمی‌شود.</span></p></li>
                <li><p><span>پروازهای چارتر یا در کل تمام بلیت‌های لحظه آخری از این پوشش مستثنی هستند.</span></p></li>
                <li><p><span>برای اخذ خسارت باید علت و زمان تأخیر به‌صورت کتبی موجود و مورد تأیید شرکت حمل‌ونقل مربوطه یا نمایندگانش قرارگرفته باشد.</span></p></li>
                <li><p><span>هزینه‌های مربوط به این خسارت، از زمانی که بیمه‌شده جا رزرو کرده باشد، محاسبه می‌شود.</span></p></li>
              </ul>

              <h3 id="در اختیار قرار دادن اطلاعات درمانی توسط شرکت کمک‌رسان در مواقع اضطراری"><span className="p-icon"><img src="http://portal.bimetehran.com/images/static/travel/info.png" alt="اطلاعات در بیمه مسافرتی" /></span><span>در اختیار قرار دادن اطلاعات درمانی توسط شرکت کمک‌رسان در مواقع اضطراری</span></h3>
              <p>
                <span>
                  درصورتی‌که بیمه‌گزار در سفر دچار حادثه‌ای شود، شرکت کمک‌رسان موظف است اطلاعاتی از قبیل نام پزشک، دندان‌پزشک، نزدیک‌ترین بیمارستان محل حادثه و... را به استثنا مراکز تشخیص پزشکی در اختیار بیمه‌گزار قرار دهد.
                    </span>
              </p>
              <p><span>این مورد بیشتر جنبه اطلاع‌رسانی دارد. اکثر شرکت‌های کمک‌رسان اقدامات لازم را در جهت رفع نیاز بیمه‌گزار طبق شرایط بیمه‌نامه انجام می‌دهند و نیازی به کسب اطلاعات نیست.</span></p>

              <h3 id="پرداخت هزینه در صورت فقدان بار"><span className="p-icon"><img src="http://portal.bimetehran.com/images/static/travel/burden.png" alt="فقدان بار در بیمه مسافرتی" /></span><span>پرداخت هزینه در صورت فقدان بار</span></h3>
              <p>
                <span>
                  اگر بار بیمه‌گزار در مقصد تحویل داده نشود (به‌جز مقصد "ایران") شرکت بیمه تا سقف مشخصی خسارت فقدان بار را به بیمه‌گزار پرداخت می‌کند؛ به شرطی که تا 21 روز بار بیمه‌گزار پیدا نشود و مفقودی اعلام شود. به‌منظور گرفتن خسارت بار، بیمه‌گزار باید گزارشی مکتوب از شرکت هواپیمایی یا فرودگاه به شرکت بیمه ارائه دهد.
                    </span>
              </p>
              <p><span><a target="_blank">بیمه مسافرتی سامان</a> و <a target="_blank">بیمه مسافرتی ایران</a> در این حالت به ازای هر کیلو بار، 20 یورو و تا سقف 800 یورو خسارت پرداخت می‌کند.</span></p>
              <p><span><a target="_blank">بیمه مسافرتی پارسیان</a> و <a target="_blank">بیمه مسافرتی پاسارگاد</a>، تا سقف 200 یورو هزینه خسارت را پرداخت می‌کنند.</span></p>

              <h3 id="یافتن و ارسال بار"><span className="p-icon"><img src="http://portal.bimetehran.com/images/static/travel/burden2.png" alt="ارسال بار در بیمه مسافرتی" /></span><span>یافتن و ارسال بار</span></h3>
              <p>
                <span>
                  در صورت فقدان بار، شرکت کمک‌رسان باید بیمه‌گزار را در زمینه اعلام مفقودی یا شکایت بابت سرقت راهنمایی کند. اگر بار بیمه‌گزار پیدا شود، حمل بار به محل اقامت بیمه‌گزار یا کشور وی به عهده شرکت کمک‌رسان است.
                    </span>
              </p><p><span>در صورت پیدا شدن بار بیمه‌گزار باید هزینه‌ای را که شرکت کمک‌رسان بابت خسارت فقدان بار تقبل کرده است، بازگردانده شود.</span></p>
              <p></p>

              <h3 id="تأخیر در رسیدن چمدان‌ها"><span className="p-icon"><img src="http://portal.bimetehran.com/images/static/travel/baggage.png" alt="تاخیر چمدان در بیمه مسافرتی" /></span><span>تأخیر در رسیدن چمدان‌ها</span></h3>
              <p>
                <span>
                  چنانچه بار همراه بیمه‌شده تا مدت مشخصی به وی تحویل داده نشود، شرکت بیمه هزینه‌هایی را که بیمه‌شده متحمل می‌شود، تا سقف مشخصی که در بیمه‌نامه ذکرشده پرداخت می‌کند. این هزینه‌ها شامل لباس و لوازم بهداشتی و یا مدت مشخصی که در بیمه‌نامه ذکرشده (هرکدام که زودتر واقع شود) است.
                    </span>
              </p>
              <p><span>در <a target="_blank">بیمه مسافرتی سامان</a> اگر بار بیمه‌گزار تا 12 ساعت تحویل داده نشود (به استثنا کشور محل اقامت "ایران")، شرکت کمک‌رسان تا سقف 250 یورو هزینه‌های خرید لباس‌های ضروری و لوازم بهداشتی یا ظرف 48 ساعت را (هرکدام زودتر واقع شود) پرداخت می‌کند.</span></p>
              <p><span>در <a target="_blank">بیمه مسافرتی پارسیان</a> و <a target="_blank">بیمه مسافرتی پاسارگاد</a> اگر بیمه‌گزار تا 6 ساعت بار خود را تحویل نگیرد، شرکت کمک‌رسان تا سقف 100 یورو هزینه‌های اضطراری را به بیمه‌گزار به شرط ارائه فاکتور پرداخت می‌کند. در این دو بیمه مسافرتی، شرکت هواپیمایی حتماً باید وابسته به یاتا باشد.</span></p>

              <h3 id="ارائه وجه‌ ضمانت"><span className="p-icon"><img src="http://portal.bimetehran.com/images/static/travel/assurance.png" alt="وجه ضمانت در بیمه مسافرتی" /></span><span>ارائه وجه‌ ضمانت</span></h3>
              <p>
                <span>
                  در صورت نیاز، بیمه‌گزار می‌تواند تا سقف مشخصی مبلغی را در ایران نزد شرکت بیمه مسافرتی خود به‌صورت چک، نقد یا حواله قرار دهد و شرکت معادل همان مبلغ را برای بیمه‌گزار در مقصد حواله می‌کند.
                    </span>
              </p>
              <p><span>این خدمت بیمه مسافرتی مشابه خدمتی است که صرافی‌ها ارائه می‌دهند.</span></p>

              <h3 id="بازگرداندن كودكان به ايران در صورت فوت يا بستري سرپرست"><span className="p-icon"><img src="http://portal.bimetehran.com/images/static/travel/child.png" alt="بازگرداندن کودک در بیمه مسافرتی" /></span><span>بازگرداندن كودكان به ايران در صورت فوت يا بستري سرپرست</span></h3>
              <p>
                <span>
                  اگر فرد بیمه‌گزار به علت بیماری، فوت و... قادر به مراقبت از فرزند خود نباشد، شرکت بیمه با نظارت یک فرد بزرگ‌سال هزینه بازگشت فرزند به کشورش را پرداخت خواهد کرد. سن قابل ‌قبول برای فرزند بستگی به شرایط بیمه‌نامه دارد.
                    </span>
              </p>
              <p><span>بیمه مسافرتی سامان برای کودکان زیر 15 سال این پوشش را ارائه می‌دهد.</span></p>
              <p><span>برای مثال اگر تحت پوشش <a target="_blank">بیمه مسافرتی سامان</a> باشید و در سفر خارجی دچار حادثه شوید، فرزند زیر 15 سال شما به همراه یک بزرگ‌سال تحت پوشش <a href="#1396-02-14-%d8%a8%db%8c%d9%85%d9%87-%d9%85%d8%b3%d8%a7%d9%81%d8%b1%d8%aa%db%8c-%d8%b3%d8%a7%d9%85%d8%a7%d9%86/" target="_blank">بیمه مسافرتی سامان</a> به کشور محل اقامت بازگردانده می‌شود.</span></p>

              <h2 id="استثناهای پوشش بیمه مسافرتی"><span className="p-icon"><img src="http://portal.bimetehran.com/images/static/travel/exception.png" alt="استثنا پوشش بیمه مسافرتی" /></span><span>استثناهای پوشش بیمه مسافرتی</span></h2>
              <p>
                <span>
                  پوشش‌های بیمه مسافرتی غالباً دارای موارد استثنایی هم هستند. این موارد استثنا با اینکه به بیمه‌گزار خسارت وارد می‌کند ولی شامل بیمه مسافرتی نمی‌شود. استثناهای بیمه مسافرتی برای شرکت‌های بیمه مختلف، اختلافات جزئی دارد. موارد زیر تمام استثناهایی است که یک بیمه مسافرتی می‌تواند داشته باشد:
                    </span>
              </p>
              <ol className="exception">
                <li><p><span>مواردی که بیمه‌گزار  قصد سواستفاده از شرکت بیمه را داشته باشد.</span></p></li>
                <li><p><span>خسارات ناشی از تروریسم، جنگ، آشوب، مشارکت بیمه‌گزار در اقدامات جنایی یا اقدامات نیروهای مسلح هنگام صلح.</span></p></li>
                <li><p><span>خسارات ناشی از بی‌توجهی یا بی‌احتیاطی جدی بیمه‌گزار یا اعمال تقلب آمیز وی</span></p></li>
                <li><p><span>خسارات ناشی از بیمه‌گزار تحت درمان بیماری روانی یا دارای اختلال مشاعر و یا درمان این نوع بیماری‌ها</span></p></li>
                <li><p><span>صدمات ناشی از بلایای طبیعی مثل سیل، زلزله و...</span></p></li>
                <li><p><span>خسارات ناشی از مواد رادیواکتیو و فعل‌وانفعالات هسته‌ای</span></p></li>
                <li><p><span>خسارات ناشی از شرکت بیمه‌گزار در شرط‌بندی یا دعوا (مگر این‌که بیمه‌گزار قصد دفاع از خود را داشته باشد)</span></p></li>
                <li><p><span>هزینه‌های درمانی برای بیماری‌هایی که بیمه‌گزار قبل از سفر یا قبل از اعتبار بیمه‌نامه دچار آن‌ها بوده است</span></p></li>
                <li><p><span>صدمات ناشی از شرکت کردن یا تمرین بیمه‌گزار در رقابت‌ها و مسابقات ورزشی زیر نظر هر فدراسیون یا سازمان مشابه</span></p></li>
                <li><p><span>خسارات ناشی از شرکت کردن بیمه‌گزار در ورزش‌ها و اقداماتی که در عرف خطرناک تلقی می‌شوند مثل مشت‌زنی، سقوط آزاد، موتورسواری و...</span></p></li>
                <li><p><span>خسارات برای افراد مقیم دائم و دانشجویان خارج از کشور</span></p></li>
                <li><p><span>صدمات ناشی از استفاده از وسایل نقلیه غیرمتعارف (هلی‌کوپتر و...)</span></p></li>
                <li><p><span>صدمات ناشی از ریسک‌های شغلی</span></p></li>
                <li><p><span>خساراتی که بدون اطلاع به شرکت کمک‌رسان توسط بیمه‌گزار پیگیری شود (به استثنا موارد خاص)</span></p></li>
                <li><p><span>صدمات یا مرگ ناشی از خودکشی</span></p></li>
                <li><p><span>صدمات ناشی از مصرف الکل، مواد مخدر و داروهایی که بدون نسخه پزشک تجویز شده باشد یا قبل از سفر بیمه‌گزار مصرف کرده باشد. بعضی شرکت‌های بیمه حتی عوارض ناشی از داروهایی را که پزشک تجویز کرده باشد، تحت پوشش قرار نمی‌دهند.</span></p></li>
                <li><p><span>هزینه‌های مربوط به درمان‌های توان‌بخشی، فیزیوتراپی، آفتاب درمانی، درمان به‌منظور زیبایی و معالجه از طریق چشمه‌های آب معدنی</span></p></li>
                <li><p><span>هزینه‌های بیمه‌گزار برای تهیه لوازمی مثل عینک، وسایل کمک ارتوپدی، ارتودنسی، پروتز و...</span></p></li>
                <li><p><span>خسارات ناشی از باری که به‌خوبی بسته نشده باشد یا شامل مواد فاسدشدنی باشد</span></p></li>
                <li><p><span>موارد ناشی از بارداری، زایمان، سقط جنین و پیشگیری از بارداری</span></p></li>
                <li><p><span>مواردی که قبل از شروع اعتبار بیمه‌نامه اتفاق بیفتد</span></p></li>
                <li><p><span>مواردی که ناشی از کوتاهی نیروهای حوادث غیرمترقبه (اورژانس، آتش‌نشانی و...) باشد</span></p></li>
                <li><p><span>هزینه‌های ناشی از درمان بیماری‌های صعب‌العلاج و یا بیماری‌های مزمن، واگیردار و ادامه‌دار</span></p></li>
                <li><p><span>هزینه‌های مربوط به خسارات پس از تشخیص بیماری صعب‌العلاج (شیمی‌درمانی و...)</span></p></li>
                <li><p><span>درصورتی‌که بیمه‌گزار برخلاف توصیه پزشک به سفر برود.</span></p></li>
                <li><p><span>خسارت‌های ناشی از تأخیر در پروازهای چارتری و غیرعادی</span></p></li>
                <li><p><span>تأخیر به دلیل جنگ، اعتصاب و... که بیمه‌گزار قبل از شروع سفر به آن‌ها آگاه بوده است.</span></p></li>
                <li><p><span>تحریم قطعی یا موقت پرواز توسط مقامات ارشد فرودگاه و سازمان‌های مشابه درصورتی‌که بیمه‌گزار قبل از شروع سفر به آن‌ها آگاه باشد.</span></p></li>
                <li><p><span>عوارض ناشی از معالجات انجام‌شده در کشور محل اقامت</span></p></li>
                <li><p><span>هزینه‌های ناشی از اقدامات پیشگیرانه و واکسیناسیون</span></p></li>
                <li><p><span>درمان خساراتی که طبق نظر پزشک ضرورتی برای درمان ندارد</span></p></li>
                <li><p><span>خسارت بیماری‌های شایع در دنیا</span></p></li>
              </ol>


              <h2 id="شرایط بیمه مسافرتی"><span className="p-icon"><img src="http://portal.bimetehran.com/images/static/travel/condition.png" alt="شرایط بیمه مسافرتی" /></span><span>شرایط بیمه مسافرتی</span></h2>
              <p>
                <span>
                  شرکت‌های بیمه مختلفی خدمات بیمه مسافرتی را ارائه می‌دهند. بسته به شرکت بیمه‌ای که انتخاب می‌کنید، این شرایط ممکن است متفاوت باشد.
                    </span>
              </p>
              <p><span><a target="_blank">بهترین بیمه مسافرتی خارج از کشور</a> می‌تواند برای هر فرد با توجه به شرایط سفر و وضعیت وی متفاوت باشد. به همین خاطر هرکس با بالا بردن اطلاعات خود در مورد انواع بیمه مسافرتی می‌تواند <a href="#1396-02-21-%d8%a8%d9%87%d8%aa%d8%b1%db%8c%d9%86-%d8%a8%db%8c%d9%85%d9%87-%d9%85%d8%b3%d8%a7%d9%81%d8%b1%d8%aa%db%8c-%d8%ae%d8%a7%d8%b1%d8%ac-%d8%a7%d8%b2-%da%a9%d8%b4%d9%88%d8%b1/" target="_blank">بهترین بیمه مسافرتی خارج از کشور</a> را برای خود برگزیند.</span></p>
              <p><span>پس بهتر است در مورد عوامل تعیین‌کننده بیمه مسافرتی بیشتر بدانیم. این عوامل عبارتند از:</span></p>

              <h3 id="مدت زمان سفر"><span className="p-icon"><img src="http://portal.bimetehran.com/images/static/travel/time.png" alt="زمان بیمه مسافرتی" /></span>مدت زمان سفر</h3>
              <p>
                <span>
                  بسته به مدت زمانی که قصد سفر دارید و می‌خواهید تحت پوشش بیمه مسافرتی باشید، نوع بیمه مسافرتی شما فرق دارد. انواع مدت زمانی که معمولاً شرکت‌ها 		بیمه‌نامه مسافرتی صادر می‌کنند، به‌صورت زیر است:
                    </span>
              </p>
              <ul>
                <li><p><span>7 - 1 روز</span></p></li>
                <li><p><span>15 - 8 روز</span></p></li>
                <li><p><span>23 - 16 روز</span></p></li>
                <li><p><span>31 - 24 روز</span></p></li>
                <li><p><span>45 - 32 روز</span></p></li>
                <li><p><span>62 - 46 روز</span></p></li>
                <li><p><span>92 - 63 روز</span></p></li>
                <li><p><span>شش‌ماهه</span></p></li>
                <li><p><span>یک‌ساله</span></p></li>
              </ul>
              <p><span>البته بعضی از شرکت‌های بیمه، بیمه مسافرتی شش‌ماهه و یک‌ساله صادر نمی‌کنند.</span></p>
              <p><span>اگر ازجمله کسانی هستید که در طول سال زیاد سفر خارجی می‌روید، برای شما به‌صرفه‌تر است بیمه مسافرتی شش‌ماهه یا یک‌ساله تهیه کنید. در غیر این صورت فقط برای مدت سفر خود کافی است بیمه تهیه کنید.</span></p>

              <h3 id="سن بیمه‌گزار"><span className="p-icon"><img src="http://portal.bimetehran.com/images/static/travel/age.png" alt="سن بیمه گزار در بیمه مسافرتی" /></span>سن بیمه‌گزار</h3>
              <p>
                <span>
                  شرکت‌های بیمه برای بیمه مسافرتی یک دسته‌بندی سن دارند و بسته به اینکه بیمه‌گزار در کدام‌یک از این دسته‌ها قرار بگیرد، نوع بیمه مسافرتی و نرخ آن متفاوت است. این دسته‌بندی به شرح زیر است:
                    </span>
              </p>
              <ul>
                <li><p><span>تا 12 سال</span></p></li>
                <li><p><span>13 تا 65 سال</span></p></li>
                <li><p><span>66 تا 70 سال</span></p></li>
                <li><p><span>71 تا 75 سال</span></p></li>
                <li><p><span>76 تا 80 سال</span></p></li>
                <li>
                  <p>
                    <span>81 تا 85 سال (یا بالای 81 سال)</span>
                  </p>
                </li>
              </ul>
              <p><span>مورد آخر در شرکت‌های بیمه مختلف متفاوت است. بعضی شرکت‌ها به افراد بالای 85 سال خدمات بیمه مسافرتی ارائه نمی‌دهند.</span></p>

              <h3 id="سقف تعهدات"><span className="p-icon"><img src="http://portal.bimetehran.com/images/static/travel/ceil.png" alt="سقف تعهدات بیمه مسافرتی" /></span>سقف تعهدات</h3>
              <p>
                <span>
                  سقف تعهد حداکثر تعهد مالی است که شرکت بیمه به بیمه‌گزار دارد. برای مثال اگر سقف تعهد هزینه‌های درمانی یک طرح 30 هزار یورو باشد یعنی طبق شرایط <a href="#1396-02-24-%d8%a8%db%8c%d9%85%d9%87-%d9%86%d8%a7%d9%85%d9%87-%d9%85%d8%b3%d8%a7%d9%81%d8%b1%d8%aa%db%8c/" target="_blank">بیمه‌ نامه مسافرتی</a>، بیمه تا سقف 30 هزار یورو هزینه‌های درمان بیمه‌گزار را می‌پردازد.
                    </span>
              </p>
              <p><span>سقف تعهد پوشش‌های مختلف در یک طرح متفاوت است. طرح‌های مختلف بیمه مسافرتی را با سقف تعهد هزینه‌های درمان آن می‌شناسند. برای مثال طرح 50 هزار یورویی یعنی سقف تعهدات هزینه‌های درمانی این طرح، 50 هزار یورو است.</span></p>
              <p><span>هرچه سقف تعهد یک طرح بالاتر باشد، این طرح هزینه‌های بیشتری را در برابر پوشش‌ها شامل می‌شود و به‌تبع آن حق بیمه بالاتری دارد. در بعضی موارد طرح‌های دارای سقف تعهد بالاتر، پوشش‌های بیشتری هم شامل می‌شود.</span></p>
              <p><span>سقف تعهدات معمولاً از 10 هزار تا 50 هزار یورو است.</span></p>

              <h3 id="مناطق تحت پوشش بیمه مسافرتی"><span className="p-icon"><img src="http://portal.bimetehran.com/images/static/travel/areas.png" alt="مناطق تحت پوشش بیمه مسافرتی" /></span>مناطق تحت پوشش بیمه مسافرتی</h3>
              <p>
                <span>
                  شرکت‌های بیمه کشورهایی که در سراسر جهان پوشش می‌دهند را به دسته‌های مختلفی تقسیم کرده‌اند و هرکدام از این کشورها را در یک دسته قرار داده‌اند. برای مثال <a href="#1396-02-14-%d8%a8%db%8c%d9%85%d9%87-%d9%85%d8%b3%d8%a7%d9%81%d8%b1%d8%aa%db%8c-%d8%b3%d8%a7%d9%85%d8%a7%d9%86/" target="_blank">بیمه مسافرتی سامان</a> در دسته‌بندی بیمه مسافرتی خود، عراق، سوریه و عربستان را در یک دسته جای داده است. این دسته‌بندی در شرکت‌های بیمه مختلف متفاوت است. بیمه‌گزار باید با توجه به مناطقی که قصد سفر دارد، دسته موردنظر خود را انتخاب کند.
                    </span>
              </p>
              <p><span>بی‌شک هر چه حوزه مناطق وسیع‌تر باشد، حق بیمه مسافرتی بالاتر است.</span></p>

              <h3 id="طرح‌های بیمه مسافرتی"><span className="p-icon"><img src="http://portal.bimetehran.com/images/static/travel/plan.png" alt="طرح‌های بیمه مسافرتی" /></span>طرح‌های بیمه مسافرتی</h3>
              <p>
                <span>
                  طرح‌های بیمه مسافرتی همان چیزی است که درنهایت باید توسط بیمه‌گزار انتخاب و خریداری شود. این طرح‌ها مناطقی که از بیمه‌گزار حمایت می‌شود و سقف تعهدات آن‌ها را بیان می‌کند.
                    </span>
              </p>
              <p>
                <span>
                  برای مثال طرح شنگن 30 هزار یورویی یعنی این طرح در حوزه شنگن و تا سقف تعهد 30 هزار یورو معتبر است.
                    </span>
              </p>
              <p>
                <span>
                  این طرح‌ها در شرکت‌های بیمه مختلف متفاوت است. برای انتخاب <a target="_blank">بهترین بیمه مسافرتی خارج از کشور</a> بیمه‌گزار باید تمام طرح‌های تمام شرکت‌های بیمه را باهم مقایسه کرده و متناسب با نیاز و شرایط خود، بهترین آن‌ها را انتخاب کند.
                    </span>
              </p>

              <h3 id="طرح‌های خاص بیمه مسافرتی"><span className="p-icon"><img src="http://portal.bimetehran.com/images/static/travel/special.png" alt="طرح‌های خاص بیمه مسافرتی" /></span>طرح‌های خاص بیمه مسافرتی</h3>
              <p><span>بعضی شرکت‌های بیمه برای بیمه مسافرتی دارای طرح‌های خاصی نیز هستند. برای مثال بیمه مسافرتی سامان، طرح اقتصادی و زیارتی دارد.</span></p>
              <p><span>در طرح اقتصادی سقف تعهد پوشش‌ها پایین‌تر از طرح‌های عادی است و بعضی از این طرح‌ها شاید پوشش‌های کمتری را شامل شود. در عوض حق بیمه این طرح بسیار پایین‌تر از طرح‌های عادی است.</span></p>
              <p><span>در طرح زیارتی که <a target="_blank">بیمه مسافرتی سامان</a> برای عراق، سوریه و عربستان در نظر گرفته است، یکی از موارد استثنا در پوشش‌ها حذف شده و جزو پوشش‌ها قرارگرفته است. در این طرح اگر بیمه‌گزاری طی اقدامات تروریستی و جنگ دچار خسارت شود، بیمه مسافرتی شامل وی می‌شود. درصورتی‌که در طرح‌های عادی این موضوع برقرار نیست و اگر بیمه‌گزار بر اثر جنگ یا اقدامات تروریستی دچار صدمه شود، بیمه مسافرتی شامل او نمی‌شود.</span></p>

              <h3 id="مدت پوشش بیمه مسافرتی"><span className="p-icon"><img src="http://portal.bimetehran.com/images/static/travel/duration.png" alt="مدت پوشش بیمه مسافرتی" /></span>مدت پوشش بیمه مسافرتی</h3>
              <p><span>پوشش بیمه مسافرتی از زمانی که مهر خروج بر پاسپورت بیمه‌گزار بخورد، شروع می‌شود. از زمانی که بیمه‌گزار بیمه مسافرتی خود را خریداری می‌کند، مدت مشخصی فرصت دارد تا از کشور خارج شود. این مدت برای بعضی شرکت‌های بیمه شش ماه و برای بعضی دیگر تا یک سال است.</span></p>
              <p><span>پوشش‌های بیمه مسافرتی برای سفرهای کمتر از 92 روز متوالی صادق است؛ حتی در طرح‌های شش‌ماهه و یک‌ساله این موضوع برقرار است.</span></p>
              <p><span>برای مثال اگر بیمه‌گزاری طرح یک‌ساله <a target="_blank">بیمه مسافرتی پارسیان</a> را انتخاب کند، یک سال از زمان صدور بیمه‌نامه فرصت دارد تا از کشور خارج شود. فرض کنید بیمه‌گزار نه ماه پس از صدور <a href="#1396-02-24-%d8%a8%db%8c%d9%85%d9%87-%d9%86%d8%a7%d9%85%d9%87-%d9%85%d8%b3%d8%a7%d9%81%d8%b1%d8%aa%db%8c/" target="_blank">بیمه‌ نامه مسافرتی</a> از کشور خارج شود. یک سال مهلت <a href="#1396-02-24-%d8%a8%db%8c%d9%85%d9%87-%d9%86%d8%a7%d9%85%d9%87-%d9%85%d8%b3%d8%a7%d9%81%d8%b1%d8%aa%db%8c/" target="_blank">بیمه‌ نامه مسافرتی</a> از همان زمان آغاز می‌شود. در طی این یک سال اگر بیمه‌گزار تعدادی سفر کوتاه‌تر از 92 روز متوالی برود، در تمام این سفرها تحت پوشش بیمه مسافرتی است؛ اما اگر بیمه‌گزار در طول این یک سال به سفری بیش از 92 روز متوالی برود، از روز 93ام به بعد تحت پوشش بیمه مسافرتی نیست تا زمانی که سفر تمام شود و دوباره در سفر بعدی تحت پوشش قرار گیرد.</span></p>

              <h3 id="حق بیمه مسافرتی"><span className="p-icon"><img src="http://portal.bimetehran.com/images/static/travel/insurance.png" alt="حق بیمه مسافرتی" /></span>حق بیمه مسافرتی</h3>

              <p><span><a >نرخ بیمه مسافرتی خارج از کشور</a> به عوامل متعددی بستگی دارد که به‌صورت کامل به بررسی آن پرداختیم. بسته به سن بیمه‌گزار، مدت زمان سفر، نوع طرح انتخابی، مناطق تحت پوشش در طرح و سقف تعهد خسارات <a href="#1396-02-17-%d9%86%d8%b1%d8%ae-%d8%a8%db%8c%d9%85%d9%87-%d9%85%d8%b3%d8%a7%d9%81%d8%b1%d8%aa%db%8c-%d8%ae%d8%a7%d8%b1%d8%ac-%d8%a7%d8%b2-%da%a9%d8%b4%d9%88%d8%b1/">نرخ بیمه مسافرتی خارج از کشور</a> متفاوت است.</span></p>


              <h3 id="تخفیف‌های گروهی خرید بیمه مسافرتی"><span className="p-icon"><img src="http://portal.bimetehran.com/images/static/travel/discount.png" alt="تخفیف های بیمه مسافرتی" /></span>تخفیف‌های گروهی خرید بیمه مسافرتی</h3>
              <p><span>شرکت‌های بیمه برای افرادی که به‌صورت گروهی بیمه مسافرتی تهیه می‌کنند، تخفیف‌هایی در نظر می‌گیرند. تورهای مسافرتی نیز از همین گزینه استفاده می‌کنند و برای مسافرین خود بیمه مسافرتی تهیه می‌کنند. برای مثال <a href="#1396-02-17-%d9%86%d8%b1%d8%ae-%d8%a8%db%8c%d9%85%d9%87-%d9%85%d8%b3%d8%a7%d9%81%d8%b1%d8%aa%db%8c-%d8%ae%d8%a7%d8%b1%d8%ac-%d8%a7%d8%b2-%da%a9%d8%b4%d9%88%d8%b1/" target="_blank">نرخ بیمه مسافرتی خارج از کشور</a> در حالتی که گروهی از بیمه البرز خریداری شود، به شرح زیر است:</span></p>
              <ul>
                <li><p><span>برای ۲۰-۱۰ نفر: ۵%</span></p></li>
                <li><p><span>برای ۵۰-۲۱ نفر: ۱۰%</span></p></li>
                <li><p><span>برای ۱۰۰-۵۱ نفر: ۱۵%</span></p></li>
                <li><p><span>برای بالای ۱۰۱ نفر: ۲۰%</span></p></li>
              </ul>

              <h3 id="شرکت های بیمه"><span className="p-icon"><img src="http://portal.bimetehran.com/images/static/travel/company.png" alt="شرکت‌های بیمه مسافرتی" /></span>شرکت های بیمه</h3>
              <p><span>شرکت‌های بیمه مختلفی خدمات بیمه مسافرتی را ارائه می‌دهند. خدماتی که این شرکت‌ها ارائه می‌دهند، تفاوت‌هایی با یکدیگر دارد. حق بیمه این بیمه‌نامه‌های مسافرتی با یکدیگر متفاوت است. بین این شرکت‌های بیمه، ارزان‌ترین یا گران‌ترین آن‌ها الزاماً بهترین نیست و برای انتخاب <a href="#1396-02-21-%d8%a8%d9%87%d8%aa%d8%b1%db%8c%d9%86-%d8%a8%db%8c%d9%85%d9%87-%d9%85%d8%b3%d8%a7%d9%81%d8%b1%d8%aa%db%8c-%d8%ae%d8%a7%d8%b1%d8%ac-%d8%a7%d8%b2-%da%a9%d8%b4%d9%88%d8%b1/" target="_blank">بهترین بیمه مسافرتی خارج از کشور</a> علاوه بر عواملی که در بالا به آن‌ها اشاره شد، باید به یک عامل دیگر توجه کرد. این عامل "کیفیت ارائه خدمات حین بروز حادثه" است. متأسفانه قبل از استفاده و قرار گرفتن در موقعیت حادثه، نمی‌توان از کیفیت این عامل باخبر شد.</span></p>
              <p><span>برای پی بردن به این عامل، باید از ارگانی کمک گرفت که اطلاعات بیمه مرکزی را تحلیل می‌کند و کارشناسان آن کیفیت خدمات شرکت‌های بیمه را بررسی می‌کنند. این کار از طریق یک سامانه آنلاین انجام‌شده است!</span></p>

              <h3 id="استعلام قیمت حق بیمه مسافرتی"><span className="p-icon"><img src="http://portal.bimetehran.com/images/static/travel/call-for-price.png" alt="استعلام قیمت حق بیمه مسافرتی" /></span>استعلام قیمت حق بیمه مسافرتی</h3>
              <p><span>برای استعلام </span><a >نرخ بیمه مسافرتی خارج از کشور</a> چند راه پیش رو دارید:</p>
              <ol>
                <li><p><span>می‌توان به سایت شرکت‌های بیمه مراجعه کرد. بعضی شرکت‌ها نرخ بیمه مسافرتی طرح‌های مختلف را روی سایت خود قرار داده‌اند. اما بعضی از قیمت‌ها قدیمی است و سایت‌ها به‌روز نیستند. لذا این روش گزینه مناسبی برای استعلام قیمت به نظر نمی‌رسد.</span></p></li>
                <li><p><span>روش دیگر تماس با شرکت‌های بیمه و استعلام تلفنی قیمت است. تماس تلفنی با بعضی از شرکت‌های بیمه بسیار دشوار است و ممکن است موفق به برقراری تماس نشوید. در صورت موفقیت در برقراری تماس در این روش امکان مقایسه طرح‌های شرکت‌های بیمه مختلف بسیار وقت‌گیر و دشوار است و باید با تمام شرکت‌های بیمه تماس گرفت و از قیمت حق بیمه مسافرتی آن‌ها باخبر شد. همچنین ممکن است بعضی شرکت‌های بیمه اطلاعات کامل را طی تماس تلفنی در اختیار شما قرار ندهند.</span></p></li>
                <li>
                  <p>
                    <span>
                      روش دیگر نیز مراجعه حضوری به یکی از نمایندگی‌های بیمه مورد نظر است که قطعاً کاری زمان‌بر و دشوار است؛ مخصوصاً اگر بخواهید حق بیمه چند شرکت را با یکدیگر مقایسه کنید. بهترین راه استعلام بیمه مسافرتی، سامانه‌ای است که بتوان از طریق آن طرح‌های بیمه مسافرتی شرکت‌های ارائه‌دهنده را با قیمت‌های به‌روز و دقیق مشاهده کرد. با این روش می‌توان با توجه به حق بیمه موردنظر، بهترین طرح را انتخاب کرد.
                            </span>
                  </p>
                </li>
              </ol>

              <h3 id="نحوه خرید بیمه مسافرتی"><span className="p-icon"><img src="http://portal.bimetehran.com/images/static/travel/purchase.png" alt="خرید بیمه مسافرتی" /></span>نحوه خرید بیمه مسافرتی</h3>

              <p><span>برای <a>خرید بیمه مسافرتی</a> چندین روش وجود دارد:</span></p>
              <ol>
                <li><p><span>مرسوم‌ترین روش خرید حضوری است که با مراجعه به یکی از نمایندگی‌های بیمه موردنظر، میسر است. این روش با توجه به دوری مسیرها و مشغله روزانه، می تواند وقت‌گیر و دشوار باشد.</span></p></li>
                <li><p><span>روش دیگر خرید اینترنتی است که بعضی از نمایندگان بیمه انجام می‌دهند. با استفاده از این روش با ارسال اسکن صفحه اول پاسپورت خود برای نماینده، می‌توانید بیمه‌نامه خود را به‌صورت اینترنتی دریافت کنید. مشکل این روش این است که نمی دانیم کدام یک از نمایندگی ها این روش خرید را دارند. با این روش امکان مقایسه طرح‌های مختلف وجود ندارد و باید به تمام شرکت‌های بیمه برای اطلاع از قیمت و شرایط بیمه مسافرتی، ارتباط برقرار کرد که امری زمان‌بر و دشوار است.</span></p></li>
                <li><p><span>بعضی شرکت‌ها دارای سامانه فروش آنلاین بیمه هستند که از این طریق می‌توان به‌صورت اینترنتی بیمه مسافرتی خریداری کرد. متأسفانه تعداد کمی از شرکت‌های بیمه دارای چنین سیستمی برای خرید بیمه هستند و اکثر آن‌ها فاقد این روش خرید هستند. همچنین سامانه آنلاین بعضی از شرکت‌های بیمه دارای ایراداتی است که برای خرید بیمه، فرد موفق به طی کردن تمام مراحل نشده و خرید انجام نمی‌گیرد.</span></p></li>
                <li><p><span>بهترین روش <a>خرید بیمه مسافرتی</a> استفاده از سامانه‌ای آنلاین با قیمت‌های دقیق و به‌روز است. سامانه‌ای که بتوان به کمک آن طرح‌های بیمه مورد نظر را با یکدیگر مقایسه کرده و بهترین آن را با توجه به شرایط خود و سفر خود انتخاب و خریداری کرد.</span></p></li>
              </ol>
            </div>
            <div id="faq" className="tab-pane fade">
              <ul id="faq-ask-section" className="faq-ask-section">
                <li className="faq-items">
                  <i className="fa fa-chevron-down faq-item-icon"></i>
                  <a className="faq-item-title" data-toggle="collapse" href="#f1" role="button" aria-expanded="false">
                    بیمه مسافرتی چیست؟
                        </a>
                  <div className="collapse multi-collapse" id="f1">
                    <p>
                      بیمه مسافرتی در برابر خطرات مختلفی که ممکن است در سفر به وجود بیاید، از بیمه‌گزاران پشتیبانی می‌کند. تهدیداتی مثل صدمات جسمی، تأخیرهای طولانی در حرکت، گم شدن بار، تأخیر در رسیدن بار و... با داشتن بیمه مسافرتی نگران‌کننده نیست.
                            </p>
                  </div>
                </li>
                <li className="faq-items">
                  <i className="fa fa-chevron-down faq-item-icon"></i>
                  <a className="faq-item-title" data-toggle="collapse" href="#f2" role="button" aria-expanded="false">
                    آیا داشتن بیمه مسافرتی برای من الزامی است؟
                        </a>
                  <p className="collapse multi-collapse" id="f2">
                    بیمه مسافرتی برای سفر به بعضی مناطق الزامی است. در این مناطق بدون بیمه مسافرتی سفارت‌خانه به شما ویزا نمی‌دهد. برای مثال برای سفر به منطقه شنگن، بیمه مسافرتی الزامی است. باید با توجه به مقصد سفر خود ببینید که آیا بیمه مسافرتی ضروری است یا نه.
                        </p>
                </li>
                <li className="faq-items">
                  <i className="fa fa-chevron-down faq-item-icon"></i>
                  <a className="faq-item-title" data-toggle="collapse" href="#f3" role="button" aria-expanded="false">
                    نداشتن بیمه مسافرتی چه مشکلاتی را برای من به وجود می‌آورد؟
                        </a>
                  <p className="collapse multi-collapse" id="f3">
                    بیمه مسافرتی در برابر تهدیدات احتمالی سفر از شما محافظت می‌کند. برای مثال اگر در سفر دچار حادثه جسمی شوید، با توجه به هزینه بالای درمان در بعضی از کشورها همچنین ناآشنا بودن با محل و زبان کشور مقصد، داشتن بیمه مسافرتی به شدت توصیه می‌شود.
                        </p>
                </li>
                <li className="faq-items">
                  <i className="fa fa-chevron-down faq-item-icon"></i>
                  <a className="faq-item-title" data-toggle="collapse" href="#f4" role="button" aria-expanded="false">
                    بیمه مسافرتی چه فایده‌ای برای من دارد؟
                        </a>
                  <p className="collapse multi-collapse" id="f4">
                    با داشتن بیمه مسافرتی نباید نگران مشکلات سفر بود؛ چون در برابر مسائل مختلفی که ممکن است در سفر پیش بیاید، از شما حمایت می‌کند. اگر وسیله حمل‌ونقل شما تأخیر طولانی داشته باشد، اگر دچار حادثه جسمی شوید، اگر بار همراه شما گم شود و مسائل دیگر بیمه مسافرتی از شما در برابر همه این‌ها پشتیبانی می‌کند.
                        </p>
                </li>
                <li className="faq-items">
                  <i className="fa fa-chevron-down faq-item-icon"></i>
                  <a className="faq-item-title" data-toggle="collapse" href="#f5" role="button" aria-expanded="false">
                    منظور از پوشش در بیمه مسافرتی چیست؟
                        </a>
                  <p className="collapse multi-collapse" id="f5">
                    مواردی را که شامل بیمه مسافرتی می‌شود، پوشش نام دارد. طبق این پوشش‌ها اگر به بیمه‌گزار صدمه‌ای وارد شود، شرکت بیمه اقدامات لازم را انجام می‌دهد.
                        </p>
                </li>
                <li className="faq-items">
                  <i className="fa fa-chevron-down faq-item-icon"></i>
                  <a className="faq-item-title" data-toggle="collapse" href="#f6" role="button" aria-expanded="false">
                    بیمه مسافرتی چه خساراتی را پوشش می‌دهد؟
                        </a>
                  <p className="collapse multi-collapse" id="f6">
                    انواع خساراتی مثل صدمات جسمی، خسارات مالی ناشی از گم شدن بار، تأخیر وسیله حمل‌ونقل، گم‌شدن یا به سرقت رفتن پول، گم شدن مدارک شناسایی و... تحت پوشش بیمه مسافرتی است
                        </p>
                </li>
                <li className="faq-items">
                  <i className="fa fa-chevron-down faq-item-icon"></i>
                  <a className="faq-item-title" data-toggle="collapse" href="#f7" role="button" aria-expanded="false">
                    ارزان‌ترین بیمه مسافرتی را از کدام شرکت تهیه کنم؟
                        </a>
                  <p className="collapse multi-collapse" id="f7">
                    نرخ بیمه مسافرتی خارج از کشور در شرکت‌های بیمه مختلف متفاوت است. شما می‌توانید از سامانه استعلام قیمت آمینا برای اطلاع از ارزان‌ترین بیمه مسافرتی استفاده کنید
                        </p>
                </li>
                <li className="faq-items">
                  <i className="fa fa-chevron-down faq-item-icon"></i>
                  <a className="faq-item-title" data-toggle="collapse" href="#f8" role="button" aria-expanded="false">
                    هنگام بروز حادثه در سفر چه اقدامی باید انجام دهم؟
                        </a>
                  <p className="collapse multi-collapse" id="f8">
                    باید فوراً با شرکت کمک‌رسان تماس بگیرید و حادثه را برای کارشناس شرح دهید. شماره این شرکت روی بیمه‌نامه شما نوشته شده است
                        </p>
                </li>
                <li className="faq-items">
                  <i className="fa fa-chevron-down faq-item-icon"></i>
                  <a className="faq-item-title" data-toggle="collapse" href="#f9" role="button" aria-expanded="false">
                    حق بیمه مسافرتی برای من چگونه محاسبه می‌شود؟
                        </a>
                  <p className="collapse multi-collapse" id="f9">
                    حق بیمه مسافرتی به عوامل متعددی بستگی دارد. بسته به سن شما، مقصد و مدت سفرتان و سقف تعهداتی که برای بیمه مسافرتی خود انتخاب می‌کنید، حق بیمه مسافرتی شما می‌تواند متفاوت باشد
                        </p>
                </li>
                <li className="faq-items">
                  <i className="fa fa-chevron-down faq-item-icon"></i>
                  <a className="faq-item-title" data-toggle="collapse" href="#f10" role="button" aria-expanded="false">
                    بهترین بیمه مسافرتی را کدام شرکت بیمه ارائه می‌کند؟
                        </a>
                  <div className="collapse multi-collapse" id="f10">
                    بهترین بیمه مسافرتی خارج از کشور را باید با توجه به معیارهای مشخصی سنجید. سامانه آمینا با توجه به این معیارها بیمه‌های مسافرتی مختلف را دسته‌بندی کرده است.
                        </div>
                </li>
                <li className="faq-items">
                  <i className="fa fa-chevron-down faq-item-icon"></i>
                  <a className="faq-item-title" data-toggle="collapse" href="#f11" role="button" aria-expanded="false">
                    برای سفر به کدام مناطق بیمه مسافرتی لازم است؟
                        </a>
                  <p className="collapse multi-collapse" id="f11">
                    بعضی از سفارت‌خانه‌ها داشتن بیمه مسافرتی را برای اخذ ویزا الزامی می‌دانند. بسته به مقصدی که برای سفر خود در نظر دارید، ممکن است به بیمه مسافرتی نیاز داشته باشید. برای مثال در حوزه شنگن بیمه مسافرتی الزامی است.
                        </p>
                </li>
                <li className="faq-items">
                  <i className="fa fa-chevron-down faq-item-icon"></i>
                  <a className="faq-item-title" data-toggle="collapse" href="#f12" role="button" aria-expanded="false">
                    آیا برای سفرهای داخلی هم می‌توانم بیمه مسافرتی تهیه کنم؟
                        </a>
                  <p className="collapse multi-collapse" id="f12">
                    بیمه مسافرتی برای سفرهای داخلی وجود ندارد. برای سفرهای داخلی شما باید بیمه حوادث انفرادی یا مسئولیت تهیه کنید
                        </p>
                </li>
                <li className="faq-items">
                  <i className="fa fa-chevron-down faq-item-icon"></i>
                  <a className="faq-item-title" data-toggle="collapse" href="#f13" role="button" aria-expanded="false">
                    چگونه می‌توانم بیمه مسافرتی را تمدید کنم؟
                        </a>
                  <p className="collapse multi-collapse" id="f13">
                    بیمه مسافرتی دارای مدت مشخصی است و پس از آن باطل می‌شود. برای تمدید باید مجدداً خریداری فرمایید.
                        </p>
                </li>
                <li className="faq-items">
                  <i className="fa fa-chevron-down faq-item-icon"></i>
                  <a className="faq-item-title" data-toggle="collapse" href="#f14" role="button" aria-expanded="false">
                    چگونه می‌توانم بیمه مسافرتی خریداری کنم؟
                        </a>
                  <p className="collapse multi-collapse" id="f14">
                    شما می‌توانید از طریق سامانه آمینا بیمه مورد نظر خود را انتخاب کرده و به صورت آنلاین خریداری کنید
                        </p>
                </li>
                <li className="faq-items">
                  <i className="fa fa-chevron-down faq-item-icon"></i>
                  <a className="faq-item-title" data-toggle="collapse" href="#f15" role="button" aria-expanded="false">
                    برای خرید فوری بیمه مسافرتی چه کاری باید انجام دهم؟
                        </a>
                  <p className="collapse multi-collapse" id="f15">
                    در صورت خرید بیمه مسافرتی از وب‌سایت آمینا، بیمه‌نامه شما حداکثر ظرف یک روز به‌صورت رایگان برای شما ارسال می‌شود.
                        </p>
                </li>
                <li className="faq-items">
                  <i className="fa fa-chevron-down faq-item-icon"></i>
                  <a className="faq-item-title" data-toggle="collapse" href="#f16" role="button" aria-expanded="false">
                    آیا بیمه مسافرتی هزینه سرماخوردگی یا مسمویت را پرداخت می کند ؟
                        </a>
                  <p className="collapse multi-collapse" id="f16">
                    یکی از پوشش‌های بیمه مسافرتی صدمات جسمی و هزینه‌های درمانی است
                        </p>
                </li>
                <li className="faq-items">
                  <i className="fa fa-chevron-down faq-item-icon"></i>
                  <a className="faq-item-title" data-toggle="collapse" href="#f17" role="button" aria-expanded="false">
                    آیا گم شدن بار تحت پوشش بیمه مسافرتی است ؟
                        </a>
                  <p className="collapse multi-collapse" id="f17">
                    مطابق شرایط بیمه‌نامه، شرکت بیمه هزینه فقدان بار شما را پرداخت می‌کند
                        </p>
                </li>
                <li className="faq-items">
                  <i className="fa fa-chevron-down faq-item-icon"></i>
                  <a className="faq-item-title" data-toggle="collapse" href="#f18" role="button" aria-expanded="false">
                    کدام بیمه مسافرتی معتبر است؟
                        </a>
                  <p className="collapse multi-collapse" id="f18">
                    بیمه‌های مسافرتی با شرکت‌های کمک‌رسان بین‌المللی کار می‌کنند و این شرکت‌ها خدمت بیمه را در کشورهای دیگر به شما ارائه می‌دهند. بسته به اطلاعاتی که وب‌سایت آمینا در مورد شرکت‌های مختلف بیمه جمع‌آوری کرده است، می‌توان به میزان اعتبار هر شرکت پی برد
                        </p>
                </li>
                <li className="faq-items">
                  <i className="fa fa-chevron-down faq-item-icon"></i>
                  <a className="faq-item-title" data-toggle="collapse" href="#f19" role="button" aria-expanded="false">
                    اعتبار بیمه مسافرتی از کی شروع می‌شود؟
                        </a>
                  <p className="collapse multi-collapse" id="f19">
                    بسته به شرکتی که بیمه خود را از آن تهیه کرده‌اید این موضوع متفاوت است. بعضی شرکت‌ها 6 ماه و بعضی دیگر تا یک‌سال وقت برای خروج از کشور می‌دهند. اعتبار بیمه‌نامه شما بعد از 6 ماه یا یک سال تازه آغاز می‌شود و برای مدتی که بیمه‌نامه را خریداری کردید معتبر است.
                        </p>
                </li>
                <li className="faq-items">
                  <i className="fa fa-chevron-down faq-item-icon"></i>
                  <a className="faq-item-title" data-toggle="collapse" href="#f20" role="button" aria-expanded="false">
                    از چه زمانی می‌توانم از بیمه مسافرتی خود استفاده کنم؟
                        </a>
                  <div className="collapse multi-collapse" id="f20">
                    به محض اینکه مهر خروج از کشور بر روی گذرنامه شما بخورد، تحت پوشش بیمه مسافرتی قرار می‌گیرید. البته این بیمه تا زمانی که هنوز از کشور خارج نشده‌اید، پوششی برای شما نخواهد داشت.در صورت بروز تأخیر در هواپیماهای وابسته به شرکت‌های هواپیمایی ایران بیمه مسافرتی هیچ پوشش و مسئولیتی ندارد.
                        </div>
                </li>
                <li className="faq-items">
                  <i className="fa fa-chevron-down faq-item-icon"></i>
                  <a className="faq-item-title" data-toggle="collapse" href="#f21" role="button" aria-expanded="false">
                    اگر تاریخ ویزای من تغییر کند می‌توانم تاریخ بیمه مسافرتی خود را تغییر بدهم؟
                        </a>
                  <div className="collapse multi-collapse" id="f21">
                    بعد از صدور بیمه مسافرتی، شما تا مدت مشخصی فرصت دارید از کشور خارج شوید. این مدت در بعضی از شرکت‌های بیمه 6 ماه و بعضی دیگر تا 1 سال است. اگر تاریخ ویزای شما بیش از این مقدار معین عقب افتاده باشد می‌توانید بیمه مسافرتی خود را باطل کرده و درخواست صدور بیمه دیگری را با تاریخ جدید بدهید.
                        </div>
                </li>
                <li className="faq-items">
                  <i className="fa fa-chevron-down faq-item-icon"></i>
                  <a className="faq-item-title" data-toggle="collapse" href="#f22" role="button" aria-expanded="false">
                    آیا می‌توانم بیمه مسافرتی خود را تمدید کنم؟
                        </a>
                  <div className="collapse multi-collapse" id="f22">
                    خیر، بیمه مسافرتی پس از مدت مشخص باطل می‌شود و شما باید درخواست بیمه دیگری برای تمدید بدهید.
                        </div>
                </li>
                <li className="faq-items">
                  <i className="fa fa-chevron-down faq-item-icon"></i>
                  <a className="faq-item-title" data-toggle="collapse" href="#f23" role="button" aria-expanded="false">
                    من مقیم کشور آلمان هستم. آیا برای سفر بیمه مسافرتی بخرم؟
                        </a>
                  <div className="collapse multi-collapse" id="f23">
                    خیر؛ بیمه مسافرتی برای افرادی که سفر میکنند، خدمات ارائه میدهند. قاعدتاً افراد مقیم آن کشور تحت پوشش شرکتهای بیمه کشور مقصد خواهند بود.
                        </div>
                </li>
                <li className="faq-items">
                  <i className="fa fa-chevron-down faq-item-icon"></i>
                  <a className="faq-item-title" data-toggle="collapse" href="#f24" role="button" aria-expanded="false">
                    در چه شرایطی بیمه‌گزار می‌تواند بیمه مسافرتی خود را باطل کند؟
                        </a>
                  <div className="collapse multi-collapse" id="f24">
                    1- در صورت صدور ویزا، با درخواست کتبی پس از پایان مدت ویزا به نمایندگی های بیمه ای، که از آن بیمه مسافرت خریداری کرده است مراجعه و بیمه نامه خود را باطل کند.
                            <br />
                    2- در صورت عدم صدور ویزا، با درخواست کتبی و ارائه نامه سفارت به نمایندگی های بیمه ای، که از آن بیمه مسافرت خریداری کرده است مراجعه و بیمه نامه خود را باطل کند.
                        </div>
                </li>
                <li className="faq-items">
                  <i className="fa fa-chevron-down faq-item-icon"></i>
                  <a className="faq-item-title" data-toggle="collapse" href="#f25" role="button" aria-expanded="false">
                    آیا برای سفر به تایلند بیمه مسافرتی لازم است؟
                        </a>
                  <div className="collapse multi-collapse" id="f25">
                    با توجه به مزایایی که بیمه مسافرتی برای شما ایجاد می‌کند، خرید آن توصیه می‌شود. ولی برای سفر به کشور تایلند داشتن آن الزامی نیست.
                        </div>
                </li>
                <li className="faq-items">
                  <i className="fa fa-chevron-down faq-item-icon"></i>
                  <a className="faq-item-title" data-toggle="collapse" href="#f26" role="button" aria-expanded="false">
                    آیا برای سفر به ترکیه بیمه مسافرتی لازم است؟
                        </a>
                  <div className="collapse multi-collapse" id="f26">
                    با توجه به مزایایی که بیمه سفر برای شما دارد، خرید آن توصیه می‌شود. ولی برای سفر به کشور ترکیه داشتن آن ضروری نیست.
                        </div>
                </li>
                <li className="faq-items">
                  <i className="fa fa-chevron-down faq-item-icon"></i>
                  <a className="faq-item-title" data-toggle="collapse" href="#f27" role="button" aria-expanded="false">
                    برای دریافت خسارت بیمه مسافرتی از شرکت بیمه، چه مدارکی لازم دارم؟
                        </a>
                  <div className="collapse multi-collapse" id="f27">
                    بیمه نامه ( یا شماره بیمه نامه [Policy Number] هم کفایت می‌کند.)  و مدارک مربوط به حادثه در خارج از کشور را باید به همراه داشته باشید.
                        </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Travel;