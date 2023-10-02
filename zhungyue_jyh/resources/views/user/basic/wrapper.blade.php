<!DOCTYPE html>
<html class="no-js" lang="zh-TW">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>中悦耑悦｜中悦建設機構．全新落成｜官網</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="keywords" content="中悦耑悦,桃園買房,桃園新成屋,桃園市百坪豪宅,中路特區豪宅">
    <meta name="description" content="中悦耑悦：桃園中路特區，司法園區正60米大興西路，116-122坪，全新完工；預約賞屋：03-3566677">
    <meta property="og:locale" content="zh_TW" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="中悦耑悦｜中悦建設機構．全新落成｜官網" />
    <meta property="og:description" content="中悦耑悦：桃園中路特區，司法園區正60米大興西路，116-122坪，全新完工；預約賞屋：03-3566677" />
    <meta property="og:site_name" content="中悦耑悦｜中悦建設機構．全新落成｜官網" />
    <meta name="twitter:description" content="中悦耑悦：桃園中路特區，司法園區正60米大興西路，116-122坪，全新完工；預約賞屋：03-3566677" />
    <meta name="twitter:title" content="中悦耑悦｜中悦建設機構．全新落成｜官網" />
    <meta itemprop="name" content="中悦耑悦｜中悦建設機構．全新落成｜官網" />
    <meta itemprop="description" content="中悦耑悦：桃園中路特區，司法園區正60米大興西路，116-122坪，全新完工；預約賞屋：03-3566677" />
            <meta name='facebook-domain-verification' content="" />
    <!-- Facebook share og meta /end -->
    <!-- This script prevents links from opening in Mobile Safari. https://gist.github.com/1042026 -->
    <!--
    <script>(function(a,b,c){if(c in b&&b[c]){var d,e=a.location,f=/^(a|html)$/i;a.addEventListener("click",function(a){d=a.target;while(!f.test(d.nodeName))d=d.parentNode;"href"in d&&(d.href.indexOf("http")||~d.href.indexOf(e.host))&&(a.preventDefault(),e.href=d.href)},!1)}})(document,window.navigator,"standalone")</script>
    -->
    <!-- Common CSS file /begin -->
    <link rel="shortcut icon" href="{{ asset("images/user/favicon.png") }}" />
    @include('user.basic.common_css')
    <!-- Common CSS file /end -->
    <!-- Page CSS file /begin -->
    @stack('page_css')
    <!-- Page CSS file /end -->
    <!-- Google Tag Manager -->
    <!--<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-ID');</script>-->
    <!-- End Google Tag Manager -->
    @stack('csrf_token')
</head>
<body>
<div class="container">
    @include('user.basic.header')

    <section class="main">
        @yield('main')
    </section>

    @include('user.basic.footer')

</div>

@include('user.basic.common_js')

@stack('page_script')
</body>
</html>
