@extends('user.layout.wrapper')

@push('styles')
    @vite('resources/scss/user/about/statement.scss')
@endpush
    
@push('scripts')
    @vite('resources/js/user/about/statement.js')
@endpush

@section('content')
<main class="main">
    <!-- preview start -->
    <div id="preview" class="section section--preview">
        <div class="section__content">
            <div class="previewGroup previewGroup--curating">
                <div class="hero">
                    <div class="container">
                        <div class="previewGroup__title wow fadeIn" data-wow-duration="0.5s" data-wow-delay="0.5s">
                            <span class="f-section-title" data-json-key="curatingTitle1">
                                <span>10大策展議題 X </span><span>超過13場大型展覽與活動 <i class="break-mb">X</i> </span><br class="display--pc">
                                <i class="break-pc">X</i> 台東12知名活動品牌聯動
                            </span>
                            <span class="f-section-title" data-json-key="curatingTitle2">
                                <span><i class="break-mb">——</i>2026年，邀您一起體驗</span><span>台東的多元精彩！</span>
                            </span>
                        </div>
                        <div class="previewGroup__content">
                            <div class="intro wow fadeIn" data-wow-duration="0.5s" data-wow-delay="0.5s">
                                <p class="f-section-p" data-json-key="curatingIntro">由一顆落下台東土地的慢經濟種子開始，向下扎根，向上展望，逐漸萌芽、延展出「空氣」、「水」、「自然力量」、「聲音」、「漂流」、「生活」、「慢經濟體」、「台東品牌」與「永續台東」等策展議題，一層層勾勒出台東獨有的慢經濟想像藍圖。</p>
                            </div>
                            <div class="hint wow fadeIn" data-wow-duration="0.5s" data-wow-delay="1s">
                                <span class="hint__text" data-json-key="curatingHint">點擊策展議題查看詳情</span>
                                <a href="#curatingMap" class="hint__icon js-anchor"><span class="arrow"></span></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="curatingMap" class="curatingMap wow fadeIn" data-wow-duration="0.5s" data-wow-delay="0.5s">
                    <div class="wheel-container">
                        <div class="click-overlay">
                            <svg class="wheel-svg" viewBox="0 0 500 639">
                                <!-- 扇形區域 1: 空氣 -->
                                <path class="wheel-section"
                                        data-section="1"
                                        data-name="空氣"
                                        d="M 250 250 L 250 2 A 248 248 0 0 1 425.3 74.7 Z"/>

                                <!-- 扇形區域 2: 水 -->
                                <path class="wheel-section"
                                        data-section="2"
                                        data-name="水"
                                        d="M 250 250 L 425.3 74.7 A 248 248 0 0 1 498 250 Z"/>

                                <!-- 扇形區域 3: 自然力量 -->
                                <path class="wheel-section"
                                        data-section="3"
                                        data-name="自然力量"
                                        d="M 250 250 L 498 250 A 248 248 0 0 1 425.3 425.3 Z"/>

                                <!-- 扇形區域 4: 聲音 -->
                                <path class="wheel-section"
                                        data-section="4"
                                        data-name="聲音"
                                        d="M 250 250 L 425.3 425.3 A 248 248 0 0 1 250 498 Z"/>

                                <!-- 扇形區域 5: 香氣 -->
                                <path class="wheel-section"
                                        data-section="5"
                                        data-name="香氣"
                                        d="M 250 250 L 250 498 A 248 248 0 0 1 74.7 425.3 Z"/>

                                <!-- 扇形區域 6: 生活 -->
                                <path class="wheel-section"
                                        data-section="6"
                                        data-name="生活"
                                        d="M 250 250 L 74.7 425.3 A 248 248 0 0 1 2 250 Z"/>

                                <!-- 扇形區域 7: 慢經濟 -->
                                <path class="wheel-section"
                                        data-section="7"
                                        data-name="慢經濟"
                                        d="M 250 250 L 2 250 A 248 248 0 0 1 74.7 74.7 Z"/>

                                <!-- 扇形區域 8: 台東品牌 -->
                                <path class="wheel-section"
                                        data-section="8"
                                        data-name="台東品牌"
                                        d="M 250 250 L 74.7 74.7 A 248 248 0 0 1 250 2 Z"/>

                                <!-- 中心圓圈: 種子 -->
                                <circle class="center-circle"
                                        cx="250" cy="250" r="80"
                                        data-section="center"
                                        data-name="種子"/>

                                <!-- 底部圓圈 9: 永續台東-->
                                <circle class="bottom-circle"
                                        cx="250" cy="543" r="96"
                                        data-section="9"
                                        data-name="永續台東"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div class="previewGroup previewGroup--features">
                <div class="container">
                    <div class="previewGroup__title wow fadeIn" data-wow-duration="0.5s" data-wow-delay="0.5s">
                        <span class="f-section-title" data-json-key="featuresTitle">
                            串連台東山海與特色活動品牌<br>
                            打造整年度的精彩！
                        </span>
                    </div>
                    <div class="previewGroup__content wow fadeIn" data-wow-duration="0.5s" data-wow-delay="1s">
                        <ul class="featuresList">
                            <li>
                                <img src="{{ asset('images/features/img_feature-1.png') }}" alt="台東炮炸寒單爺" class="featureImage" data-json-key="feature1">
                                <a href="https://www.zztaitung.com/20114/taitung-bombhandan-2" class="featureText featureText--front" target="_blank" data-json-key="feature1">台東炮炸<br>寒單爺</a>
                            </li>
                            <li>
                                <img src="{{ asset('images/features/img_feature-2.png') }}" alt="自然醒慢活祭" class="featureImage" data-json-key="feature2">
                                <a href="https://www.taitungspiritfestival.tw" class="featureText featureText--front" target="_blank" data-json-key="feature2">自然醒<br>慢活祭</a>
                            </li>
                            <li>
                                <img src="{{ asset('images/features/img_feature-3.png') }}" alt="臺東慢食節" class="featureImage" data-json-key="feature3">
                                <a href="https://slowfoodtaitung.tw/festival" class="featureText featureText--front" target="_blank" data-json-key="feature3">臺東慢食節</a>
                            </li>
                            <li>
                                <img src="{{ asset('images/features/img_feature-4.png') }}" alt="PASIWALI原住民族國際音樂節" class="featureImage" data-json-key="feature4">
                                <a href="https://taiwanpasiwalifestival.com" class="featureText featureText--front" target="_blank" data-json-key="feature4">PASIWALI<br>原住民族<br>國際音樂節</a>
                            </li>
                            <li>
                                <img src="{{ asset('images/features/img_feature-5.png') }}" alt="台東最美星空" class="featureImage" data-json-key="feature5">
                                <a href="https://www.facebook.com/StarryTaitung/?locale=zh_TW" class="featureText featureText--front" target="_blank" data-json-key="feature5">台東<br>最美星空</a>
                            </li>
                            <li>
                                <img src="{{ asset('images/features/img_feature-6.png') }}" alt="臺灣國際熱氣球嘉年華" class="featureImage" data-json-key="feature6">
                                <a href="https://balloontaiwan.taitung.gov.tw/zh-tw" class="featureText featureText--front" target="_blank" data-json-key="feature6">臺灣國際<br>熱氣球嘉年華</a>
                            </li>
                            <li>
                                <img src="{{ asset('images/features/img_feature-7.png') }}" alt="臺灣國際衝浪公開賽" class="featureImage" data-json-key="feature7">
                                <a href="https://www.facebook.com/taiwanopenofsurfing/" class="featureText featureText--front" target="_blank" data-json-key="feature7">臺灣國際<br>衝浪公開賽</a>
                            </li>
                            <li>
                                <img src="{{ asset('images/features/img_feature-8.png') }}" alt="東海岸大地藝術節" class="featureImage" data-json-key="feature8">
                                <a href="https://www.eastcoast-nsa.gov.tw/teclandart/" class="featureText featureText--front" target="_blank" data-json-key="feature8">東海岸<br>大地藝術節</a>
                            </li>
                            <li class="multiple">
                                <img src="{{ asset('images/features/img_feature-9.png') }}" alt="南迴藝術季 縱谷大地藝術季" class="featureImage" data-json-key="feature9">
                                <div class="featureText featureText--front" data-json-key="feature9">
                                    南迴藝術季<br>縱谷大地藝術季
                                </div>
                                <div class="featureText featureText--back" data-json-key="feature9" data-links-container>
                                    <a href="https://www.facebook.com/NanhuiArtProject/?locale=zh_TW" target="_blank" data-link-index="0">南迴藝術季</a>
                                    <a href="https://www.eastcoast-nsa.gov.tw/teclandart/" target="_blank" data-link-index="1">縱谷大地藝術季</a>
                                </div>
                            </li>
                            <li class="multiple">
                                <img src="{{ asset('images/features/img_feature-10.png') }}" alt="臺東藝術節 臺東藝穗節" class="featureImage" data-json-key="feature10">
                                <div class="featureText featureText--front" data-json-key="feature10">
                                    臺東藝術節<br>臺東藝穗節
                                </div>
                                <div class="featureText featureText--back" data-json-key="feature10" data-links-container>
                                    <a href="https://www.facebook.com/Taitungartsfestival/?locale=zh_TW" target="_blank" data-link-index="0">臺東藝術節</a>
                                    <a href="https://www.taitungfringefestival.com" target="_blank" data-link-index="1">臺東藝穗節</a>
                                </div>
                            </li>
                            <li>
                                <img src="{{ asset('images/features/img_feature-11.png') }}" alt="池上秋收稻穗藝術節" class="featureImage" data-json-key="feature11">
                                <a href="https://www.facebook.com/Chishangarts.org" class="featureText featureText--front" target="_blank" data-json-key="feature11">池上秋收<br>稻穗藝術節</a>
                            </li>
                            <li>
                                <img src="{{ asset('images/features/img_feature-12.png') }}" alt="台東光祭" class="featureImage" data-json-key="feature12">
                                <a href="https://www.facebook.com/TaitungLightFestival/?locale=zh_TW" class="featureText featureText--front" target="_blank" data-json-key="feature12">台東光祭</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- preview end -->
</main>
@endsection