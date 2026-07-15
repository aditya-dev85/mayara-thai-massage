import { useState, useEffect, useRef, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const GOLD="#C9A84C",DG="#A87830",GRN="#4A7C59";
const BIZ={name:"Mayara Thai Massage",phone:"+66 94 423 9455",raw:"66944239455",email:"info@mayarathai.com",address:"181 Suk Kasem Road, Ratchadaphisek, Din Daeng, Bangkok 10400",hours:"Daily 11:00 AM – Late",rating:5.0,reviews:500};
const SOC={wa:"https://wa.me/66944239455",line:"https://line.me/ti/p/@mayarathai",fb:"https://facebook.com/mayarathai",ig:"https://instagram.com/mayarathai",google:"https://g.page/r/mayarathai/review"};
const LANGS=[["en","EN 🇬🇧"],["th","TH 🇹🇭"],["zh","ZH 🇨🇳"],["ja","JA 🇯🇵"],["hi","HI 🇮🇳"]];
const SECS=["home","about","services","booking","gallery","reviews","contact","faq"];

const TR={
  en:{nav:{home:"Home",about:"About Us",services:"Services",booking:"Book Now",gallery:"Gallery",reviews:"Reviews",contact:"Contact",faq:"FAQ"},
    hero:{h:"Relax, Recharge & Restore",s:"Experience authentic Thai healing traditions in the heart of Bangkok — where ancient wisdom meets modern serenity.",book:"Book Now",call:"Call Now",wa:"WhatsApp",line:"LINE Chat",r:"Google Reviews"},
    about:{t:"About Mayara Thai Massage",s:"Rooted in tradition. Dedicated to your wellness.",p1:"Our certified therapists master traditional Thai techniques passed down through generations.",p2:"We maintain the highest hygiene standards with 100% natural oils and sanitized treatment rooms.",p3:"From the moment you arrive, our friendly team crafts your perfect wellness experience.",f:["Certified Therapists","Natural Products","Clean & Hygienic","5-Star Service"]},
    svc:{t:"Our Services",s:"Choose from our curated menu of authentic Thai healing treatments",dur:"Duration",min:"min",bk:"Book This Service"},
    bk:{t:"Book Your Session",s:"Reserve your treatment in a few easy steps. We confirm within 30 minutes.",steps:["Select Service","Date & Time","Your Details","Payment"],sv:"Select Service",th:"Therapist (Optional)",dt:"Select Date",tm:"Select Time",any:"Any available therapist",nm:"Full Name",ph:"Phone Number",em:"Email Address",nt:"Special Requests",pay:"Payment Method",cash:"Pay at Shop",card:"Credit / Debit Card",qr:"PromptPay QR",next:"Next",back:"Back",confirm:"Confirm Booking",done:"Booking Confirmed!",doneMsg:"Check your email & WhatsApp for details. Booking reference:"},
    gal:{t:"Our Sanctuary",s:"A glimpse into our peaceful space"},
    rev:{t:"What Our Guests Say",s:"Real experiences from real guests",leave:"Leave a Google Review"},
    cnt:{t:"Find Us",s:"Walk in or book ahead",dir:"Get Directions",form:{n:"Your Name",e:"Email",m:"Message",s:"Send Message",ok:"Message sent! We'll reply within 24 hours 🙏"}},
    faq:{t:"Frequently Asked Questions",s:"Everything you need to know before your visit"},
    nl:{t:"Stay in Touch",s:"Get exclusive offers & wellness tips",ph:"Your email address",btn:"Subscribe",ok:"Thank you for subscribing! 🎉"},
    ft:{rights:"All rights reserved",open:"Open Daily 11:00 AM – Late"},
    ck:{t:"We use cookies to enhance your experience.",a:"Accept All",d:"Decline"},
    adm:{t:"Admin Dashboard",login:"Admin Login",em:"Email",pw:"Password",si:"Sign In",lo:"Logout",bks:"Bookings",cus:"Customers",rev:"Revenue",rat:"Rating",today:"Today's Appointments",ov:"Overview",rc:"Revenue (Last 6 Months)",sc:"Top Services"}},
  th:{nav:{home:"หน้าหลัก",about:"เกี่ยวกับ",services:"บริการ",booking:"จองนัด",gallery:"แกลเลอรี่",reviews:"รีวิว",contact:"ติดต่อ",faq:"คำถาม"},
    hero:{h:"ผ่อนคลาย ฟื้นฟู และรีชาร์จ",s:"สัมผัสการนวดแผนไทยแท้ๆ ใจกลางกรุงเทพฯ เพื่อการผ่อนคลายและฟื้นฟูร่างกาย",book:"จองเลย",call:"โทรหาเรา",wa:"WhatsApp",line:"LINE",r:"Google Reviews"},
    about:{t:"เกี่ยวกับมายารา",s:"สืบสานภูมิปัญญา มุ่งสู่สุขภาพที่ดีของคุณ",p1:"นักบำบัดของเราผ่านการรับรองในเทคนิคนวดแผนไทยโบราณ",p2:"เราใช้ผ้าลินินสะอาด น้ำมันธรรมชาติ 100%",p3:"ทีมงานของเรายินดีดูแลคุณตั้งแต่ก้าวแรกที่เข้ามา",f:["นักบำบัดมืออาชีพ","ผลิตภัณฑ์ธรรมชาติ","สะอาดถูกสุขอนามัย","บริการระดับ 5 ดาว"]},
    svc:{t:"บริการของเรา",s:"เลือกการนวดที่เหมาะกับคุณ",dur:"ระยะเวลา",min:"นาที",bk:"จองบริการนี้"},
    bk:{t:"จองนัดหมาย",s:"จองได้ง่ายๆ เราจะยืนยันภายใน 30 นาที",steps:["เลือกบริการ","วันและเวลา","ข้อมูลของคุณ","ชำระเงิน"],sv:"เลือกบริการ",th:"นักบำบัด (ไม่บังคับ)",dt:"เลือกวันที่",tm:"เลือกเวลา",any:"นักบำบัดที่ว่าง",nm:"ชื่อ-นามสกุล",ph:"เบอร์โทร",em:"อีเมล",nt:"ข้อความพิเศษ",pay:"ช่องทางชำระเงิน",cash:"ชำระที่ร้าน",card:"บัตรเครดิต/เดบิต",qr:"PromptPay QR",next:"ถัดไป",back:"ย้อนกลับ",confirm:"ยืนยันการจอง",done:"จองสำเร็จ!",doneMsg:"เราจะยืนยันทาง WhatsApp และอีเมล รหัสการจอง:"},
    gal:{t:"แกลเลอรี่",s:"มุมมองความสงบของเรา"},
    rev:{t:"เสียงจากลูกค้า",s:"ประสบการณ์จริงจากลูกค้า",leave:"รีวิวใน Google"},
    cnt:{t:"ติดต่อเรา",s:"เดินเข้ามาหรือจองล่วงหน้า",dir:"เส้นทาง",form:{n:"ชื่อ",e:"อีเมล",m:"ข้อความ",s:"ส่งข้อความ",ok:"ส่งแล้ว! เราจะตอบกลับเร็วๆ นี้ 🙏"}},
    faq:{t:"คำถามที่พบบ่อย",s:"ทุกสิ่งที่ควรรู้ก่อนมา"},
    nl:{t:"ติดตามข่าวสาร",s:"รับข้อเสนอพิเศษ",ph:"อีเมลของคุณ",btn:"สมัคร",ok:"ขอบคุณที่สมัคร! 🎉"},
    ft:{rights:"สงวนลิขสิทธิ์",open:"เปิดทุกวัน 11:00 น. – ดึก"},
    ck:{t:"เราใช้คุกกี้เพื่อปรับปรุงประสบการณ์",a:"ยอมรับ",d:"ปฏิเสธ"},
    adm:{t:"แดชบอร์ด",login:"เข้าสู่ระบบ",em:"อีเมล",pw:"รหัสผ่าน",si:"เข้าสู่ระบบ",lo:"ออก",bks:"การจอง",cus:"ลูกค้า",rev:"รายได้",rat:"คะแนน",today:"นัดวันนี้",ov:"ภาพรวม",rc:"รายได้ 6 เดือน",sc:"บริการยอดนิยม"}},
  zh:{nav:{home:"首页",about:"关于我们",services:"服务",booking:"立即预约",gallery:"图库",reviews:"评价",contact:"联系",faq:"常见问题"},
    hero:{h:"放松、充电与恢复",s:"在曼谷市中心体验正宗泰式传统按摩疗愈之道",book:"立即预约",call:"拨打电话",wa:"WhatsApp",line:"LINE聊天",r:"Google评价"},
    about:{t:"关于玛雅拉",s:"植根传统，专注身心健康",p1:"我们的专业治疗师均获得传统泰式按摩技术认证。",p2:"我们保持最高标准的清洁卫生，使用100%天然精油。",p3:"从您踏入我们的门那一刻起，友好的团队就致力于为您量身定制体验。",f:["认证治疗师","天然产品","干净卫生","五星服务"]},
    svc:{t:"我们的服务",s:"从精心策划的泰式疗愈菜单中选择",dur:"时长",min:"分钟",bk:"预约此服务"},
    bk:{t:"预约您的疗程",s:"几个步骤完成预约，30分钟内确认",steps:["选择服务","日期时间","您的信息","付款"],sv:"选择服务",th:"治疗师（可选）",dt:"选择日期",tm:"选择时间",any:"任意可用治疗师",nm:"您的姓名",ph:"电话号码",em:"电子邮件",nt:"特殊要求",pay:"付款方式",cash:"到店付款",card:"信用卡/借记卡",qr:"PromptPay QR",next:"下一步",back:"返回",confirm:"确认预约",done:"预约确认！",doneMsg:"请查收确认邮件和WhatsApp消息。预约参考编号："},
    gal:{t:"图库",s:"我们宁静圣地的一瞥"},
    rev:{t:"客户评价",s:"来自真实客户的真实体验",leave:"留下Google评价"},
    cnt:{t:"找到我们",s:"欢迎直接光临或提前预约",dir:"获取路线",form:{n:"您的姓名",e:"电子邮件",m:"留言",s:"发送消息",ok:"消息已发送！我们将在24小时内回复。🙏"}},
    faq:{t:"常见问题",s:"访问前您需要了解的一切"},
    nl:{t:"保持联系",s:"获取独家优惠",ph:"您的电子邮件",btn:"订阅",ok:"感谢订阅！🎉"},
    ft:{rights:"版权所有",open:"每天开放 11:00 – 深夜"},
    ck:{t:"我们使用cookies来改善您的体验。",a:"接受",d:"拒绝"},
    adm:{t:"管理仪表板",login:"管理员登录",em:"电子邮件",pw:"密码",si:"登录",lo:"退出",bks:"预约",cus:"客户",rev:"收入",rat:"评分",today:"今日预约",ov:"概览",rc:"收入（近6个月）",sc:"热门服务"}},
  ja:{nav:{home:"ホーム",about:"私たちについて",services:"サービス",booking:"予約する",gallery:"ギャラリー",reviews:"レビュー",contact:"お問い合わせ",faq:"よくある質問"},
    hero:{h:"リラックス、充電、そして回復",s:"バンコクの中心で本格的なタイ伝統マッサージをご体験ください",book:"今すぐ予約",call:"電話する",wa:"WhatsApp",line:"LINE",r:"Googleレビュー"},
    about:{t:"マヤラについて",s:"伝統に根ざし、あなたの健康に捧げる",p1:"セラピストたちは世代から世代へと受け継がれた伝統的なタイマッサージ技術の認定を受けています。",p2:"最高の清潔基準を維持し、100%天然オイルのみを使用しています。",p3:"ご来店の瞬間から、フレンドリーなチームがあなたのニーズを理解します。",f:["認定セラピスト","天然製品","清潔で衛生的","5つ星サービス"]},
    svc:{t:"サービス",s:"本格的なタイ癒しトリートメントをお選びください",dur:"時間",min:"分",bk:"このサービスを予約"},
    bk:{t:"セッションを予約する",s:"簡単なステップで予約完了。30分以内に確認します。",steps:["サービス選択","日時","お客様情報","お支払い"],sv:"サービスを選択",th:"セラピスト（任意）",dt:"日付を選択",tm:"時間を選択",any:"担当者おまかせ",nm:"お名前",ph:"電話番号",em:"メールアドレス",nt:"特別なリクエスト",pay:"お支払い方法",cash:"店頭でお支払い",card:"クレジット/デビットカード",qr:"PromptPay QR",next:"次へ",back:"戻る",confirm:"予約を確定する",done:"予約確認！",doneMsg:"確認メールとWhatsAppをご確認ください。予約番号："},
    gal:{t:"ギャラリー",s:"私たちの静かな空間をご覧ください"},
    rev:{t:"お客様の声",s:"実際のお客様からの本音レビュー",leave:"Googleレビューを書く"},
    cnt:{t:"アクセス",s:"ウォークインまたは事前予約でお越しください",dir:"ルートを取得",form:{n:"お名前",e:"メール",m:"メッセージ",s:"送信する",ok:"送信しました！24時間以内にご返信いたします。🙏"}},
    faq:{t:"よくある質問",s:"ご来店前に知っておくべきこと"},
    nl:{t:"ニュースレター",s:"限定オファーを受け取る",ph:"メールアドレス",btn:"登録する",ok:"ご登録ありがとうございます！🎉"},
    ft:{rights:"全著作権所有",open:"毎日開営 11:00 – 深夜"},
    ck:{t:"クッキーを使用しています。",a:"同意する",d:"断る"},
    adm:{t:"管理ダッシュボード",login:"管理者ログイン",em:"メール",pw:"パスワード",si:"ログイン",lo:"ログアウト",bks:"予約",cus:"顧客",rev:"収益",rat:"評価",today:"本日の予約",ov:"概要",rc:"収益（過去6ヶ月）",sc:"人気サービス"}},
  hi:{nav:{home:"होम",about:"हमारे बारे में",services:"सेवाएं",booking:"अभी बुक करें",gallery:"गैलरी",reviews:"समीक्षाएं",contact:"संपर्क",faq:"सामान्य प्रश्न"},
    hero:{h:"आराम करें, ऊर्जा भरें और तरोताज़ा हों",s:"बैंकॉक के हृदय में प्रामाणिक थाई मालिश की परंपरा का अनुभव करें",book:"अभी बुक करें",call:"कॉल करें",wa:"WhatsApp",line:"LINE",r:"Google समीक्षाएं"},
    about:{t:"मायारा के बारे में",s:"परंपरा में जड़ें, आपके स्वास्थ्य के प्रति समर्पित",p1:"हमारे थेरेपिस्ट पीढ़ियों से चली आ रही पारंपरिक थाई मालिश तकनीकों में प्रमाणित हैं।",p2:"हम स्वच्छता के उच्चतम मानक बनाए रखते हैं और 100% प्राकृतिक तेलों का उपयोग करते हैं।",p3:"जब से आप हमारे दरवाजे से कदम रखते हैं, हमारी टीम आपकी जरूरतों को समझने के लिए समर्पित है।",f:["प्रमाणित थेरेपिस्ट","प्राकृतिक उत्पाद","स्वच्छ और स्वास्थ्यकर","5-सितारा सेवा"]},
    svc:{t:"हमारी सेवाएं",s:"प्रामाणिक थाई उपचारों के संग्रह से चुनें",dur:"अवधि",min:"मिनट",bk:"यह सेवा बुक करें"},
    bk:{t:"अपना सेशन बुक करें",s:"कुछ आसान चरणों में बुकिंग करें। 30 मिनट में पुष्टि।",steps:["सेवा चुनें","तारीख और समय","आपकी जानकारी","भुगतान"],sv:"सेवा चुनें",th:"थेरेपिस्ट (वैकल्पिक)",dt:"तारीख चुनें",tm:"समय चुनें",any:"कोई भी उपलब्ध थेरेपिस्ट",nm:"पूरा नाम",ph:"फोन नंबर",em:"ईमेल",nt:"विशेष अनुरोध",pay:"भुगतान विधि",cash:"दुकान पर भुगतान",card:"क्रेडिट/डेबिट कार्ड",qr:"PromptPay QR",next:"अगला",back:"वापस",confirm:"बुकिंग की पुष्टि करें",done:"बुकिंग पुष्टि!",doneMsg:"ईमेल और WhatsApp पर पुष्टि देखें। बुकिंग संदर्भ:"},
    gal:{t:"गैलरी",s:"हमारे शांतिपूर्ण अभयारण्य की एक झलक"},
    rev:{t:"हमारे मेहमानों की राय",s:"वास्तविक अनुभव",leave:"Google समीक्षा दें"},
    cnt:{t:"हमें खोजें",s:"वॉक-इन करें या पहले बुक करें",dir:"रास्ता पाएं",form:{n:"आपका नाम",e:"ईमेल",m:"संदेश",s:"संदेश भेजें",ok:"संदेश भेजा गया! हम 24 घंटे में जवाब देंगे। 🙏"}},
    faq:{t:"सामान्य प्रश्न",s:"अपनी यात्रा से पहले जानने योग्य सब कुछ"},
    nl:{t:"संपर्क में रहें",s:"विशेष ऑफर पाएं",ph:"आपका ईमेल",btn:"सब्सक्राइब",ok:"धन्यवाद! 🎉"},
    ft:{rights:"सर्वाधिकार सुरक्षित",open:"प्रतिदिन खुला 11:00 – देर रात"},
    ck:{t:"हम कुकीज़ का उपयोग करते हैं।",a:"स्वीकार करें",d:"अस्वीकार"},
    adm:{t:"व्यवस्थापक डैशबोर्ड",login:"व्यवस्थापक लॉगिन",em:"ईमेल",pw:"पासवर्ड",si:"साइन इन",lo:"लॉगआउट",bks:"बुकिंग",cus:"ग्राहक",rev:"राजस्व",rat:"रेटिंग",today:"आज की नियुक्तियां",ov:"अवलोकन",rc:"राजस्व (पिछले 6 महीने)",sc:"शीर्ष सेवाएं"}}
};

const SVCS=[
  {id:"s1",icon:"🙏",color:"#C9A84C",en:"Traditional Thai Massage",th:"นวดแผนไทย",zh:"传统泰式按摩",ja:"タイ古式マッサージ",hi:"पारंपरिक थाई मसाज",desc:"Ancient pressure-point therapy stretching muscles, improving circulation and restoring energy flow throughout the body.",p:{30:350,60:550,90:750,120:950}},
  {id:"s2",icon:"🌸",color:"#C97090",en:"Aroma Oil Massage",th:"นวดน้ำมันอโรมา",zh:"芳香精油按摩",ja:"アロマオイルマッサージ",hi:"अरोमा ऑयल मसाज",desc:"Soothing Swedish-style strokes with premium essential oils to deeply relax muscles and nourish the skin.",p:{60:650,90:850,120:1050}},
  {id:"s3",icon:"💪",color:"#4A7C59",en:"Deep Tissue Massage",th:"นวดเนื้อเยื่อลึก",zh:"深层组织按摩",ja:"ディープティッシュマッサージ",hi:"डीप टिश्यू मसाज",desc:"Firm, targeted pressure reaching deeper muscle layers to release chronic tension, knots, and postural pain.",p:{60:700,90:900,120:1100}},
  {id:"s4",icon:"🦶",color:"#7C9A4A",en:"Foot Massage",th:"นวดเท้า",zh:"脚部按摩",ja:"フットマッサージ",hi:"फुट मसाज",desc:"Reflexology-based treatment stimulating pressure points linked to every organ — grounding and refreshing.",p:{30:300,60:500}},
  {id:"s5",icon:"🤲",color:"#9A7C4A",en:"Neck & Shoulder Massage",th:"นวดคอและไหล่",zh:"颈肩按摩",ja:"ネック＆ショルダー",hi:"गर्दन और कंधे की मसाज",desc:"Focused relief for tension in the neck, shoulders, and upper back — perfect for desk workers.",p:{30:320,60:520}},
  {id:"s6",icon:"🧠",color:"#7A4A9A",en:"Head Massage",th:"นวดศีรษะ",zh:"头部按摩",ja:"ヘッドマッサージ",hi:"हेड मसाज",desc:"Gentle scalp and temple massage that relieves headaches, reduces stress, and promotes restful sleep.",p:{30:280,60:480}},
  {id:"s7",icon:"🌿",color:"#4A9A60",en:"Herbal Compress Massage",th:"นวดลูกประคบ",zh:"草本热敷按摩",ja:"ハーブコンプレス",hi:"हर्बल कंप्रेस मसाज",desc:"Warm herbal compresses packed with Thai medicinal herbs soothe inflammation and ease joint pain.",p:{60:750,90:950,120:1150}},
  {id:"s8",icon:"💑",color:"#C96070",en:"Couples Massage",th:"นวดคู่",zh:"情侣按摩",ja:"カップルマッサージ",hi:"कपल्स मसाज",desc:"Share relaxation side-by-side in our private couples suite — perfect for special occasions.",p:{60:1200,90:1600,120:2000}},
  {id:"s9",icon:"🔙",color:"#4A6A9A",en:"Back Pain Relief",th:"นวดบรรเทาปวดหลัง",zh:"腰背疼痛缓解",ja:"腰痛緩和マッサージ",hi:"पीठ दर्द राहत",desc:"Specialized technique targeting the spine, lower back, and hip muscles to alleviate chronic back pain.",p:{60:700,90:900}},
  {id:"s10",icon:"💼",color:"#9A8A4A",en:"Office Syndrome Massage",th:"นวดออฟฟิศซินโดรม",zh:"办公室综合征按摩",ja:"オフィス症候群マッサージ",hi:"ऑफिस सिंड्रोम मसाज",desc:"Designed for office workers — relieves stiffness in neck, shoulders, back, and wrists from prolonged desk work.",p:{60:650,90:850}},
];
const THERAPISTS=[
  {id:"t1",name:"Nong",spec:"Senior Therapist · Traditional Thai",av:"🧘"},
  {id:"t2",name:"Ploy",spec:"Aromatherapy Specialist",av:"🌸"},
  {id:"t3",name:"Wan",spec:"Deep Tissue Expert",av:"💪"},
  {id:"t4",name:"Nui",spec:"Traditional Thai Specialist",av:"🙏"},
];
const TIMES=["11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00"];
const REVIEWS=[
  {id:"r1",name:"Sarah M.",flag:"🇬🇧",loc:"United Kingdom",text:"Absolutely incredible experience. The traditional Thai massage completely transformed my body — I left feeling like a new person. The therapist was highly skilled and the space was immaculate. Will return every visit to Bangkok!",stars:5,google:true},
  {id:"r2",name:"Tanaka H.",flag:"🇯🇵",loc:"Japan",text:"バンコクで最高のマッサージ体験でした。スタッフはとても親切で、施術は本格的なタイ古式マッサージで素晴らしかったです。また必ず来ます！",stars:5,google:true},
  {id:"r3",name:"Priya K.",flag:"🇮🇳",loc:"India",text:"Found this gem near MRT Din Daeng! The aroma oil massage was heavenly. Staff speaks some Hindi which made me feel very welcome. Highly recommend to all Indian tourists.",stars:5,google:true},
  {id:"r4",name:"David L.",flag:"🇺🇸",loc:"United States",text:"Best massage I've had in Bangkok and I've tried many. Clean, professional, reasonably priced. The deep tissue massage sorted out my lower back pain completely.",stars:5,google:true},
  {id:"r5",name:"李 明",flag:"🇨🇳",loc:"China",text:"非常棒的按摩体验！环境干净整洁，按摩师技术精湛。草本热敷按摩真的太放松了。价格合理，下次来曼谷一定还会来！",stars:5,google:true},
  {id:"r6",name:"Emma T.",flag:"🇦🇺",loc:"Australia",text:"Stumbled upon Mayara after a long day exploring Bangkok — best decision I made! The foot massage and neck treatment left me completely rejuvenated. Super friendly staff.",stars:5,google:true},
];
const FAQS=[
  {q:"Do I need an appointment or can I walk in?",a:"Both are welcome! Walk-ins are accepted based on availability. To guarantee your preferred time and therapist, we recommend booking in advance via our website, WhatsApp, or LINE."},
  {q:"What payment methods do you accept?",a:"We accept cash (Thai Baht), PromptPay QR, credit/debit cards (Visa & Mastercard), and major digital wallets. Foreign currency exchange is not available on-site."},
  {q:"Is there parking available?",a:"Street parking is available on Suk Kasem Road. The nearest MRT is Sutthisan (~10 min walk). Grab/taxi can drop you directly to our address."},
  {q:"I've never had a Thai massage — what should I expect?",a:"Traditional Thai massage is performed fully clothed on a padded floor mat. Your therapist uses hands, thumbs, elbows, and feet to apply pressure and guided stretches. For lighter touch, our Aroma Oil Massage is a great starting point."},
  {q:"Do you serve tourists who don't speak Thai?",a:"Absolutely! Our team speaks English with basic Chinese, Japanese, and Hindi communication. Our booking system is available in 5 languages."},
  {q:"What is the minimum age?",a:"Guests must be 18+ for all massages. Guests aged 15–17 may receive foot massages with written parental consent."},
  {q:"Can I book same-day?",a:"Yes! Same-day bookings are available subject to availability. Contact us via WhatsApp or LINE for the fastest response."},
  {q:"What should I wear?",a:"For traditional Thai massage, we provide comfortable loose clothing. For oil massages, you'll be modestly draped with fresh linens throughout."},
  {q:"Is your facility hygienic?",a:"All linens freshly laundered, rooms sanitized between sessions, 100% natural oils. We maintain the highest hygiene standards."},
  {q:"Do you offer loyalty discounts?",a:"Yes! Multi-session packages available plus a loyalty stamp card — every 10th visit earns a free 60-minute session. Ask staff on arrival."},
];
const GALLERY=[
  {id:"g1",bg:"linear-gradient(145deg,#0D2414,#1A3D22,#2E6038)",icon:"🛏️",title:"Treatment Room",sub:"Serene & private",h:240},
  {id:"g2",bg:"linear-gradient(145deg,#2E1505,#5C3010,#8B5820)",icon:"🌿",title:"Herbal Corner",sub:"Natural remedies",h:200},
  {id:"g3",bg:"linear-gradient(145deg,#140A2E,#281650,#4A2880)",icon:"🕯️",title:"Aromatherapy Suite",sub:"Calming scents",h:280},
  {id:"g4",bg:"linear-gradient(145deg,#0A2010,#163820,#286040)",icon:"🌺",title:"Wellness Garden",sub:"Natural serenity",h:200},
  {id:"g5",bg:"linear-gradient(145deg,#2E1A05,#5E3810,#9A6030)",icon:"🙏",title:"Thai Tradition",sub:"Ancient healing art",h:260},
  {id:"g6",bg:"linear-gradient(145deg,#05181A,#103040,#206070)",icon:"🌊",title:"Relaxation Lounge",sub:"Tranquil atmosphere",h:200},
  {id:"g7",bg:"linear-gradient(145deg,#201005,#483010,#806030)",icon:"✨",title:"VIP Suite",sub:"Ultimate luxury",h:220},
  {id:"g8",bg:"linear-gradient(145deg,#0A1A10,#183030,#305050)",icon:"🎋",title:"Bamboo Suite",sub:"Peaceful retreat",h:200},
  {id:"g9",bg:"linear-gradient(145deg,#1A0510,#380A20,#600A30)",icon:"🌸",title:"Flower Suite",sub:"Floral elegance",h:240},
];
const ADM_BOOKINGS=[
  {id:"B001",ref:"MYR-A1B2-C3D",cust:"Sarah Mitchell",svc:"Traditional Thai Massage",th:"Nong",date:"2025-07-03",time:"11:00",dur:90,price:750,status:"CONFIRMED",pay:"PAID",email:"sarah@example.com"},
  {id:"B002",ref:"MYR-E5F6-G7H",cust:"Tanaka Hiroshi",svc:"Aroma Oil Massage",th:"Ploy",date:"2025-07-03",time:"13:00",dur:60,price:650,status:"PENDING",pay:"UNPAID",email:"tanaka@example.jp"},
  {id:"B003",ref:"MYR-I9J0-K1L",cust:"Priya Kapoor",svc:"Foot Massage",th:"Nui",date:"2025-07-03",time:"14:30",dur:60,price:500,status:"CONFIRMED",pay:"PAID",email:"priya@example.in"},
  {id:"B004",ref:"MYR-M2N3-O4P",cust:"David Lee",svc:"Deep Tissue Massage",th:"Wan",date:"2025-07-03",time:"16:00",dur:90,price:900,status:"COMPLETED",pay:"PAID",email:"david@example.us"},
  {id:"B005",ref:"MYR-Q5R6-S7T",cust:"Emma Thompson",svc:"Herbal Compress",th:"Nong",date:"2025-07-03",time:"18:00",dur:60,price:750,status:"PENDING",pay:"UNPAID",email:"emma@example.au"},
  {id:"B006",ref:"MYR-U8V9-W0X",cust:"Li Ming",svc:"Couples Massage",th:"Ploy",date:"2025-07-04",time:"12:00",dur:90,price:1600,status:"CONFIRMED",pay:"PAID",email:"li@example.cn"},
  {id:"B007",ref:"MYR-Y1Z2-A3B",cust:"Michael Brown",svc:"Office Syndrome",th:"Wan",date:"2025-07-04",time:"15:00",dur:60,price:650,status:"CANCELLED",pay:"REFUNDED",email:"michael@example.com"},
];
const REV_DATA=[{m:"Feb",v:42500},{m:"Mar",v:51200},{m:"Apr",v:48700},{m:"May",v:63400},{m:"Jun",v:71200},{m:"Jul",v:58900}];
const SVC_STATS=[{name:"Thai Massage",bks:145,rev:89250},{name:"Aroma Oil",bks:98,rev:63700},{name:"Deep Tissue",bks:87,rev:69600},{name:"Foot Massage",bks:134,rev:54500},{name:"Couples",bks:43,rev:72100}];
const PIE=[{name:"Confirmed",v:312,c:"#22c55e"},{name:"Completed",v:198,c:"#3b82f6"},{name:"Pending",v:87,c:"#f59e0b"},{name:"Cancelled",v:23,c:"#ef4444"}];
const SC={CONFIRMED:"#22c55e",PENDING:"#f59e0b",COMPLETED:"#3b82f6",CANCELLED:"#ef4444"};
const SBG={CONFIRMED:"#F0FFF4",PENDING:"#FFFBEB",COMPLETED:"#EFF6FF",CANCELLED:"#FEF2F2"};

const Lotus=({s=36,c="#C9A84C"})=>(
  <svg width={s} height={s} viewBox="0 0 80 80">
    <ellipse cx="40" cy="55" rx="7" ry="22" fill={c} opacity=".9"/>
    <ellipse cx="40" cy="55" rx="7" ry="22" fill={c} opacity=".9" transform="rotate(36,40,55)"/>
    <ellipse cx="40" cy="55" rx="7" ry="22" fill={c} opacity=".9" transform="rotate(-36,40,55)"/>
    <ellipse cx="40" cy="55" rx="7" ry="22" fill={c} opacity=".7" transform="rotate(72,40,55)"/>
    <ellipse cx="40" cy="55" rx="7" ry="22" fill={c} opacity=".7" transform="rotate(-72,40,55)"/>
    <circle cx="40" cy="48" r="9" fill={c}/>
  </svg>
);

function SectionHdr({label,title,sub,gold,mu,tx}){
  return(
    <div style={{textAlign:"center",marginBottom:44}}>
      <div style={{fontSize:11,color:gold,fontWeight:700,letterSpacing:".18em",textTransform:"uppercase",marginBottom:12}}>✦ {label} ✦</div>
      <h2 style={{fontSize:"clamp(1.6rem,3.5vw,2.5rem)",fontWeight:700,fontFamily:"Palatino Linotype,Palatino,Georgia,serif",color:tx,marginBottom:0}}>{title}</h2>
      <div style={{width:60,height:3,background:`linear-gradient(90deg,${gold},#A87830)`,borderRadius:2,margin:"10px auto 12px"}}/>
      {sub&&<p style={{color:mu}}>{sub}</p>}
    </div>
  );
}

function BookingWizard({t,svcs,sf,bd,be,tx,mu,gold,dg}){
  const[step,setStep]=useState(1);
  const[form,setForm]=useState({sid:"",dur:60,thid:"",date:"",time:"",name:"",phone:"",email:"",notes:"",pay:"cash"});
  const[booked,setBooked]=useState(null);
  const[loading,setLoading]=useState(false);
  const[errs,setErrs]=useState({});
  const up=(k,v)=>{setForm(f=>({...f,[k]:v}));setErrs(e=>({...e,[k]:""}));};
  const svc=svcs.find(s=>s.id===form.sid);
  const durs=svc?Object.keys(svc.p).map(Number):[];
  const price=svc&&form.dur?svc.p[form.dur]:0;
  const today=new Date().toISOString().split("T")[0];
  const inp={width:"100%",background:sf,border:`1.5px solid ${bd}`,borderRadius:12,padding:"11px 14px",fontSize:14,color:tx,fontFamily:"inherit",outline:"none",boxSizing:"border-box"};

  const validate=()=>{
    const e={};
    if(step===1&&!form.sid)e.sid="Please select a service";
    if(step===2){if(!form.date)e.date="Please select a date";if(!form.time)e.time="Please select a time";}
    if(step===3){
      if(!form.name.trim())e.name="Name is required";
      if(!form.email.trim())e.email="Email is required";
      else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))e.email="Invalid email";
      if(!form.phone.trim())e.phone="Phone is required";
    }
    setErrs(e);return Object.keys(e).length===0;
  };
  const next=()=>{if(validate())setStep(s=>Math.min(s+1,4));};
  const back=()=>setStep(s=>Math.max(s-1,1));
  const confirm=async()=>{
    if(!validate())return;
    setLoading(true);
    await new Promise(r=>setTimeout(r,1500));
    const ref="MYR-"+Math.random().toString(36).substring(2,6).toUpperCase()+"-"+Math.random().toString(36).substring(2,5).toUpperCase();
    setBooked(ref);setLoading(false);
  };

  if(booked)return(
    <div style={{textAlign:"center",padding:"28px 12px"}}>
      <div style={{width:70,height:70,borderRadius:"50%",background:"#D1FAE5",display:"flex",alignItems:"center",justifyContent:"center",fontSize:34,margin:"0 auto 14px"}}>🎉</div>
      <h3 style={{fontSize:"1.4rem",fontWeight:700,marginBottom:8,color:tx}}>{t.done}</h3>
      <p style={{color:mu,marginBottom:8,fontSize:14}}>{t.doneMsg}</p>
      <div style={{background:"#FDF9EC",border:`1px solid ${gold}40`,borderRadius:12,padding:"10px 20px",display:"inline-block",fontWeight:700,fontSize:"1.1rem",color:gold,marginBottom:20}}>{booked}</div>
      <div style={{background:"#F0FFF4",borderRadius:16,padding:18,maxWidth:340,margin:"0 auto 20px",border:"1px solid #86EFAC",fontSize:13}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}><span style={{color:mu}}>Service</span><strong>{svc?.en}</strong></div>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}><span style={{color:mu}}>Date</span><strong>{form.date}</strong></div>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}><span style={{color:mu}}>Time</span><strong>{form.time}</strong></div>
        <div style={{display:"flex",justifyContent:"space-between"}}><strong>Total</strong><strong style={{color:gold}}>฿{price.toLocaleString()}</strong></div>
      </div>
      <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
        <a href={`https://wa.me/66944239455?text=${encodeURIComponent("Hi Mayara! Booking: "+booked+". "+svc?.en+" on "+form.date+" at "+form.time)}`} target="_blank" rel="noreferrer"
          style={{background:"#25D366",color:"#fff",borderRadius:50,padding:"11px 20px",fontWeight:700,fontSize:13,textDecoration:"none"}}>💬 Confirm via WhatsApp</a>
        <button onClick={()=>{setBooked(null);setStep(1);setForm({sid:"",dur:60,thid:"",date:"",time:"",name:"",phone:"",email:"",notes:"",pay:"cash"});}}
          style={{background:`linear-gradient(135deg,${gold},${dg})`,color:"#fff",border:"none",borderRadius:50,padding:"11px 20px",fontWeight:700,fontSize:13,cursor:"pointer"}}>Book Another</button>
      </div>
    </div>
  );

  return(
    <div>
      <div style={{display:"flex",justifyContent:"center",marginBottom:28,maxWidth:480,margin:"0 auto 28px"}}>
        {t.steps.map((s,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",flex:1}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
              <div style={{width:34,height:34,borderRadius:"50%",background:step>i+1?"#22c55e":step===i+1?gold:"#E8E0D0",color:step>i+1||step===i+1?"#fff":"#9A9080",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:13,boxShadow:step===i+1?`0 0 0 4px ${gold}30`:"none",transition:"all .3s"}}>
                {step>i+1?"✓":i+1}
              </div>
              <span style={{fontSize:9,color:"#9A9080",textTransform:"uppercase",letterSpacing:".04em",textAlign:"center",maxWidth:60}}>{s}</span>
            </div>
            {i<t.steps.length-1&&<div style={{flex:1,height:2,background:step>i+1?gold:"#E8E0D0",marginBottom:14,transition:"background .3s"}}/>}
          </div>
        ))}
      </div>

      {step===1&&(
        <div>
          <h4 style={{fontWeight:700,marginBottom:12,color:tx}}>{t.sv}</h4>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,maxHeight:360,overflowY:"auto",paddingRight:4}}>
            {svcs.map(s=>(
              <button key={s.id} onClick={()=>{up("sid",s.id);up("dur",Object.keys(s.p)[0]*1);}}
                style={{textAlign:"left",padding:"12px 14px",borderRadius:14,border:`2px solid ${form.sid===s.id?gold:"#E8E0D0"}`,background:form.sid===s.id?`${gold}10`:sf,cursor:"pointer",transition:"all .2s",fontFamily:"inherit"}}>
                <div style={{fontSize:22,marginBottom:5}}>{s.icon}</div>
                <div style={{fontWeight:700,fontSize:12,color:tx}}>{s.en}</div>
                <div style={{fontSize:11,color:mu,marginTop:2}}>from ฿{Math.min(...Object.values(s.p))}</div>
                {form.sid===s.id&&(
                  <div style={{display:"flex",gap:5,flexWrap:"wrap",marginTop:8}}>
                    {Object.keys(s.p).map(d=>(
                      <button key={d} onClick={e=>{e.stopPropagation();up("dur",d*1);}}
                        style={{fontSize:11,padding:"3px 9px",borderRadius:20,border:`1px solid ${form.dur===d*1?gold:"#E8E0D0"}`,background:form.dur===d*1?gold:"transparent",color:form.dur===d*1?"#fff":mu,cursor:"pointer",fontFamily:"inherit"}}>
                        {d}m ฿{s.p[d]}
                      </button>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
          {errs.sid&&<p style={{color:"#ef4444",fontSize:12,marginTop:6}}>{errs.sid}</p>}
        </div>
      )}

      {step===2&&(
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div>
            <label style={{display:"block",fontSize:11,fontWeight:700,textTransform:"uppercase",color:mu,marginBottom:8}}>{t.th}</label>
            <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
              <button onClick={()=>up("thid","")} style={{padding:"8px 13px",borderRadius:10,border:`1.5px solid ${!form.thid?gold:"#E8E0D0"}`,background:!form.thid?`${gold}10`:sf,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>👤 {t.any}</button>
              {THERAPISTS.map(th=>(
                <button key={th.id} onClick={()=>up("thid",th.id)} style={{padding:"8px 13px",borderRadius:10,border:`1.5px solid ${form.thid===th.id?gold:"#E8E0D0"}`,background:form.thid===th.id?`${gold}10`:sf,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>{th.av} {th.name}</button>
              ))}
            </div>
          </div>
          <div>
            <label style={{display:"block",fontSize:11,fontWeight:700,textTransform:"uppercase",color:mu,marginBottom:6}}>{t.dt} *</label>
            <input type="date" value={form.date} min={today} onChange={e=>up("date",e.target.value)} style={inp}/>
            {errs.date&&<p style={{color:"#ef4444",fontSize:12,marginTop:4}}>{errs.date}</p>}
          </div>
          {form.date&&(
            <div>
              <label style={{display:"block",fontSize:11,fontWeight:700,textTransform:"uppercase",color:mu,marginBottom:6}}>{t.tm} *</label>
              <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6}}>
                {TIMES.map(sl=>(
                  <button key={sl} onClick={()=>up("time",sl)}
                    style={{padding:"8px 4px",borderRadius:8,border:`1.5px solid ${form.time===sl?gold:"#E8E0D0"}`,background:form.time===sl?gold:sf,color:form.time===sl?"#fff":mu,fontSize:12,cursor:"pointer",fontWeight:form.time===sl?700:400,fontFamily:"inherit"}}>
                    {sl}
                  </button>
                ))}
              </div>
              {errs.time&&<p style={{color:"#ef4444",fontSize:12,marginTop:4}}>{errs.time}</p>}
            </div>
          )}
        </div>
      )}

      {step===3&&(
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {[{k:"name",l:t.nm,type:"text"},{k:"phone",l:t.ph,type:"tel"},{k:"email",l:t.em,type:"email"}].map(({k,l,type})=>(
            <div key={k}>
              <label style={{display:"block",fontSize:11,fontWeight:700,textTransform:"uppercase",color:mu,marginBottom:6}}>{l} *</label>
              <input type={type} value={form[k]} onChange={e=>up(k,e.target.value)} style={{...inp,borderColor:errs[k]?"#ef4444":bd}}/>
              {errs[k]&&<p style={{color:"#ef4444",fontSize:12,marginTop:4}}>{errs[k]}</p>}
            </div>
          ))}
          <div>
            <label style={{display:"block",fontSize:11,fontWeight:700,textTransform:"uppercase",color:mu,marginBottom:6}}>{t.nt}</label>
            <textarea rows={3} value={form.notes} onChange={e=>up("notes",e.target.value)} style={{...inp,resize:"vertical"}}/>
          </div>
        </div>
      )}

      {step===4&&(
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div style={{background:sf,border:`1px solid ${bd}`,borderRadius:16,padding:18}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:8,fontSize:14}}><span style={{color:mu}}>Service</span><strong>{svc?.en}</strong></div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:8,fontSize:14}}><span style={{color:mu}}>Date & Time</span><strong>{form.date} {form.time}</strong></div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:8,fontSize:14}}><span style={{color:mu}}>Duration</span><strong>{form.dur} min</strong></div>
            <div style={{display:"flex",justifyContent:"space-between",paddingTop:10,borderTop:`1px solid ${bd}`,fontSize:16}}><strong>Total</strong><strong style={{color:gold}}>฿{price.toLocaleString()}</strong></div>
          </div>
          <div>
            <label style={{display:"block",fontSize:11,fontWeight:700,textTransform:"uppercase",color:mu,marginBottom:8}}>{t.pay}</label>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
              {[{id:"cash",icon:"💵",l:t.cash},{id:"card",icon:"💳",l:t.card},{id:"qr",icon:"📱",l:t.qr}].map(m=>(
                <button key={m.id} onClick={()=>up("pay",m.id)}
                  style={{padding:"12px 8px",borderRadius:14,border:`2px solid ${form.pay===m.id?gold:"#E8E0D0"}`,background:form.pay===m.id?`${gold}10`:sf,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4,fontSize:11,fontWeight:form.pay===m.id?700:400,fontFamily:"inherit",color:tx}}>
                  <span style={{fontSize:22}}>{m.icon}</span>{m.l}
                </button>
              ))}
            </div>
          </div>
          {form.pay==="qr"&&(
            <div style={{background:"#F0FFF4",border:"1px solid #86EFAC",borderRadius:16,padding:16,textAlign:"center"}}>
              <div style={{width:140,height:140,background:sf,border:`2px solid ${bd}`,borderRadius:12,margin:"0 auto 10px",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:4}}>
                <div style={{fontSize:36}}>📱</div>
                <div style={{fontSize:10,color:mu}}>PromptPay QR<br/>฿{price.toLocaleString()}</div>
              </div>
              <div style={{fontSize:12,color:mu}}>Scan with K PLUS, SCB Easy, or any banking app</div>
            </div>
          )}
          {form.pay==="card"&&(
            <div style={{background:"#F0F4FF",border:"1px solid #C7D2FE",borderRadius:16,padding:16}}>
              <div style={{fontSize:12,color:mu,marginBottom:10}}>Secure payment powered by Stripe</div>
              <input placeholder="1234 5678 9012 3456" style={{...inp,marginBottom:8,background:"#fff"}}/>
              <div style={{display:"flex",gap:8}}>
                <input placeholder="MM/YY" style={{...inp,width:"50%",background:"#fff"}}/>
                <input placeholder="CVC" style={{...inp,width:"50%",background:"#fff"}}/>
              </div>
            </div>
          )}
          <button onClick={confirm} disabled={loading}
            style={{width:"100%",padding:"15px",background:`linear-gradient(135deg,${gold},${dg})`,color:"#fff",border:"none",borderRadius:14,fontSize:15,fontWeight:700,cursor:loading?"not-allowed":"pointer",opacity:loading?.65:1,fontFamily:"inherit",boxShadow:`0 4px 20px ${gold}50`}}>
            {loading?"⏳ Processing...":"🗓 "+t.confirm}
          </button>
        </div>
      )}

      <div style={{display:"flex",justifyContent:"space-between",marginTop:22,paddingTop:16,borderTop:`1px solid ${bd}`}}>
        {step>1?<button onClick={back} style={{background:"none",border:"none",color:mu,cursor:"pointer",fontSize:14,fontWeight:500,fontFamily:"inherit"}}>← {t.back}</button>:<div/>}
        {step<4&&<button onClick={next} style={{background:`linear-gradient(135deg,${gold},${dg})`,color:"#fff",border:"none",borderRadius:50,padding:"11px 24px",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit",boxShadow:`0 4px 14px ${gold}50`}}>{t.next} →</button>}
      </div>
    </div>
  );
}

function AdminLogin({t,onLogin}){
  const[em,setEm]=useState("admin@mayarathai.com");
  const[pw,setPw]=useState("admin123");
  const[err,setErr]=useState("");
  const[load,setLoad]=useState(false);
  const login=async()=>{
    setLoad(true);setErr("");
    await new Promise(r=>setTimeout(r,800));
    if(em==="admin@mayarathai.com"&&pw==="admin123")onLogin();
    else setErr("Invalid email or password");
    setLoad(false);
  };
  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(145deg,#1C1915,#2D2820)",display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{background:"#fff",borderRadius:24,padding:"44px 40px",width:"100%",maxWidth:400,boxShadow:"0 40px 80px rgba(0,0,0,.3)"}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <Lotus s={52} c={GOLD}/>
          <div style={{fontSize:"1.4rem",fontWeight:700,color:GOLD,marginTop:10,fontFamily:"Georgia,serif"}}>Mayara Admin</div>
          <div style={{fontSize:13,color:"#9A9080",marginTop:4}}>{t.login}</div>
        </div>
        {[{l:t.em,v:em,sv:setEm,type:"email"},{l:t.pw,v:pw,sv:setPw,type:"password"}].map(({l,v,sv,type},i)=>(
          <div key={i} style={{marginBottom:14}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,textTransform:"uppercase",color:"#9A9080",marginBottom:6}}>{l}</label>
            <input type={type} value={v} onChange={e=>sv(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()}
              style={{width:"100%",border:"1.5px solid #E8E0D0",borderRadius:12,padding:"12px 16px",fontSize:14,outline:"none",boxSizing:"border-box"}}/>
          </div>
        ))}
        {err&&<p style={{color:"#ef4444",fontSize:13,marginBottom:12,textAlign:"center"}}>{err}</p>}
        <button onClick={login} disabled={load}
          style={{width:"100%",padding:"14px",background:`linear-gradient(135deg,${GOLD},${DG})`,color:"#fff",border:"none",borderRadius:14,fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"inherit",opacity:load?.65:1,marginBottom:12}}>
          {load?"⏳ Signing in...":t.si}
        </button>
        <p style={{fontSize:11,color:"#9A9080",textAlign:"center"}}>Demo: admin@mayarathai.com / admin123</p>
      </div>
    </div>
  );
}

function AdminDash({t,onLogout}){
  const[tab,setTab]=useState("overview");
  const[bks,setBks]=useState(ADM_BOOKINGS);
  const[search,setSearch]=useState("");
  const[filter,setFilter]=useState("ALL");
  const total=bks.reduce((s,b)=>s+(b.pay==="PAID"?b.price:0),0);
  const todayBks=bks.filter(b=>b.date==="2025-07-03");
  const filtered=bks.filter(b=>(filter==="ALL"||b.status===filter)&&(!search||b.cust.toLowerCase().includes(search.toLowerCase())||b.ref.toLowerCase().includes(search.toLowerCase())||b.svc.toLowerCase().includes(search.toLowerCase())));
  const upStatus=(id,status)=>setBks(bs=>bs.map(b=>b.id===id?{...b,status}:b));
  const tabs=[{id:"overview",icon:"📊",l:t.ov},{id:"bookings",icon:"📅",l:t.bks},{id:"customers",icon:"👥",l:t.cus},{id:"revenue",icon:"💰",l:t.rev}];
  const th={padding:"10px 14px",textAlign:"left",fontSize:11,fontWeight:700,textTransform:"uppercase",color:"#9A9080",letterSpacing:".05em"};
  const td={padding:"10px 14px"};
  return(
    <div style={{minHeight:"100vh",background:"#F8F7F4",fontFamily:"Georgia,serif"}}>
      <div style={{background:"#1C1915",padding:"0 24px",height:60,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}><Lotus s={26} c={GOLD}/>
          <div><div style={{color:GOLD,fontWeight:700,fontSize:15}}>Mayara Admin</div><div style={{color:"#5A5240",fontSize:10,textTransform:"uppercase",letterSpacing:".1em"}}>{t.t}</div></div>
        </div>
        <button onClick={onLogout} style={{background:"none",border:"1px solid #3a3020",color:"#9A9080",borderRadius:8,padding:"6px 14px",fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>← {t.lo}</button>
      </div>
      <div style={{display:"flex",minHeight:"calc(100vh - 60px)"}}>
        <div style={{width:190,background:"#fff",borderRight:"1px solid #E8E0D0",padding:"16px 0",flexShrink:0}}>
          {tabs.map(tb=>(
            <button key={tb.id} onClick={()=>setTab(tb.id)}
              style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"11px 18px",border:"none",background:tab===tb.id?`${GOLD}15`:"transparent",color:tab===tb.id?GOLD:"#7A6E63",fontWeight:tab===tb.id?700:400,fontSize:14,cursor:"pointer",textAlign:"left",borderLeft:tab===tb.id?`3px solid ${GOLD}`:"3px solid transparent",fontFamily:"inherit"}}>
              {tb.icon} {tb.l}
            </button>
          ))}
        </div>
        <div style={{flex:1,padding:24,overflowY:"auto"}}>

          {tab==="overview"&&(
            <div>
              <h2 style={{fontSize:"1.35rem",fontWeight:700,marginBottom:18,color:"#1C1915"}}>{t.ov}</h2>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:22}}>
                {[{icon:"📅",l:t.bks,v:bks.length,c:"#3b82f6",bg:"#EFF6FF"},{icon:"👥",l:t.cus,v:47,c:"#8b5cf6",bg:"#F5F3FF"},{icon:"💰",l:t.rev,v:"฿"+total.toLocaleString(),c:GOLD,bg:"#FDF9EC"},{icon:"⭐",l:t.rat,v:"5.0",c:"#f59e0b",bg:"#FFFBEB"}].map((k,i)=>(
                  <div key={i} style={{background:k.bg,border:`1px solid ${k.c}30`,borderRadius:16,padding:"16px 18px"}}>
                    <div style={{fontSize:22,marginBottom:5}}>{k.icon}</div>
                    <div style={{fontSize:"1.45rem",fontWeight:800,color:k.c}}>{k.v}</div>
                    <div style={{fontSize:12,color:"#9A9080",marginTop:2}}>{k.l}</div>
                  </div>
                ))}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:14,marginBottom:20}}>
                <div style={{background:"#fff",borderRadius:16,padding:18,border:"1px solid #E8E0D0"}}>
                  <h3 style={{fontSize:".95rem",fontWeight:700,marginBottom:14,color:"#1C1915"}}>{t.rc}</h3>
                  <ResponsiveContainer width="100%" height={190}>
                    <BarChart data={REV_DATA}><CartesianGrid strokeDasharray="3 3" stroke="#E8E0D0"/><XAxis dataKey="m" tick={{fontSize:11,fill:"#9A9080"}}/><YAxis tick={{fontSize:11,fill:"#9A9080"}} tickFormatter={v=>"฿"+(v/1000).toFixed(0)+"k"}/><Tooltip formatter={v=>["฿"+v.toLocaleString(),"Revenue"]}/><Bar dataKey="v" fill={GOLD} radius={[5,5,0,0]}/></BarChart>
                  </ResponsiveContainer>
                </div>
                <div style={{background:"#fff",borderRadius:16,padding:18,border:"1px solid #E8E0D0"}}>
                  <h3 style={{fontSize:".95rem",fontWeight:700,marginBottom:14,color:"#1C1915"}}>Booking Status</h3>
                  <ResponsiveContainer width="100%" height={160}><PieChart><Pie data={PIE} cx="50%" cy="50%" innerRadius={42} outerRadius={70} dataKey="v">{PIE.map((e,i)=><Cell key={i} fill={e.c}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer>
                  <div style={{display:"flex",flexDirection:"column",gap:4,marginTop:6}}>{PIE.map((d,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:6,fontSize:11}}><div style={{width:9,height:9,borderRadius:2,background:d.c,flexShrink:0}}/><span style={{color:"#7A6E63"}}>{d.name}: {d.v}</span></div>)}</div>
                </div>
              </div>
              <div style={{background:"#fff",borderRadius:16,padding:18,border:"1px solid #E8E0D0"}}>
                <h3 style={{fontSize:".95rem",fontWeight:700,marginBottom:12,color:"#1C1915"}}>{t.today} — {todayBks.length} appointments</h3>
                {todayBks.map(b=>(
                  <div key={b.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:"1px solid #F5F0E8"}}>
                    <div><div style={{fontWeight:600,fontSize:13}}>{b.cust}</div><div style={{fontSize:11,color:"#9A9080"}}>{b.svc} · {b.th}</div></div>
                    <div style={{textAlign:"right"}}><div style={{fontWeight:700,fontSize:13}}>{b.time}</div><span style={{background:SBG[b.status],color:SC[b.status],padding:"2px 8px",borderRadius:20,fontSize:10,fontWeight:700}}>{b.status}</span></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab==="bookings"&&(
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:10}}>
                <h2 style={{fontSize:"1.35rem",fontWeight:700,color:"#1C1915"}}>{t.bks} ({filtered.length})</h2>
                <div style={{display:"flex",gap:8}}>
                  <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)} style={{border:"1px solid #E8E0D0",borderRadius:10,padding:"8px 13px",fontSize:13,outline:"none",width:180,fontFamily:"inherit"}}/>
                  <select value={filter} onChange={e=>setFilter(e.target.value)} style={{border:"1px solid #E8E0D0",borderRadius:10,padding:"8px 12px",fontSize:13,outline:"none",cursor:"pointer",fontFamily:"inherit"}}>
                    {["ALL","PENDING","CONFIRMED","COMPLETED","CANCELLED"].map(s=><option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div style={{background:"#fff",borderRadius:16,border:"1px solid #E8E0D0",overflow:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",minWidth:700}}>
                  <thead><tr style={{background:"#F8F7F4",borderBottom:"1px solid #E8E0D0"}}>
                    {["Ref","Customer","Service","Date","Time","Price","Status","Actions"].map(h=><th key={h} style={th}>{h}</th>)}
                  </tr></thead>
                  <tbody>
                    {filtered.map(b=>(
                      <tr key={b.id} style={{borderBottom:"1px solid #F5F0E8"}}>
                        <td style={{...td,fontSize:11,color:"#9A9080",fontFamily:"monospace"}}>{b.ref}</td>
                        <td style={td}><div style={{fontWeight:600,fontSize:13}}>{b.cust}</div><div style={{fontSize:11,color:"#9A9080"}}>{b.email}</div></td>
                        <td style={{...td,fontSize:13}}>{b.svc}</td>
                        <td style={{...td,fontSize:13}}>{b.date}</td>
                        <td style={{...td,fontSize:13}}>{b.time}</td>
                        <td style={{...td,fontSize:13,fontWeight:700,color:GOLD}}>฿{b.price.toLocaleString()}</td>
                        <td style={td}><span style={{background:SBG[b.status],color:SC[b.status],padding:"3px 10px",borderRadius:20,fontSize:10,fontWeight:700}}>{b.status}</span></td>
                        <td style={td}>
                          <div style={{display:"flex",gap:4}}>
                            {b.status==="PENDING"&&<><button onClick={()=>upStatus(b.id,"CONFIRMED")} style={{background:"#D1FAE5",color:"#065F46",border:"none",borderRadius:6,padding:"4px 9px",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>✓ Confirm</button><button onClick={()=>upStatus(b.id,"CANCELLED")} style={{background:"#FEE2E2",color:"#991B1B",border:"none",borderRadius:6,padding:"4px 9px",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>✕ Cancel</button></>}
                            {b.status==="CONFIRMED"&&<button onClick={()=>upStatus(b.id,"COMPLETED")} style={{background:"#DBEAFE",color:"#1E40AF",border:"none",borderRadius:6,padding:"4px 9px",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>✓ Complete</button>}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab==="revenue"&&(
            <div>
              <h2 style={{fontSize:"1.35rem",fontWeight:700,marginBottom:18,color:"#1C1915"}}>{t.rev} Analytics</h2>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20}}>
                <div style={{background:"#fff",borderRadius:16,padding:18,border:"1px solid #E8E0D0"}}>
                  <h3 style={{fontSize:".95rem",fontWeight:700,marginBottom:14}}>{t.rc}</h3>
                  <ResponsiveContainer width="100%" height={210}><LineChart data={REV_DATA}><CartesianGrid strokeDasharray="3 3" stroke="#E8E0D0"/><XAxis dataKey="m" tick={{fontSize:11,fill:"#9A9080"}}/><YAxis tick={{fontSize:11,fill:"#9A9080"}} tickFormatter={v=>"฿"+(v/1000).toFixed(0)+"k"}/><Tooltip formatter={v=>["฿"+v.toLocaleString(),"Revenue"]}/><Line type="monotone" dataKey="v" stroke={GOLD} strokeWidth={2.5} dot={{fill:GOLD,r:4}}/></LineChart></ResponsiveContainer>
                </div>
                <div style={{background:"#fff",borderRadius:16,padding:18,border:"1px solid #E8E0D0"}}>
                  <h3 style={{fontSize:".95rem",fontWeight:700,marginBottom:14}}>{t.sc}</h3>
                  <ResponsiveContainer width="100%" height={210}><BarChart data={SVC_STATS} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="#E8E0D0"/><XAxis type="number" tick={{fontSize:10,fill:"#9A9080"}} tickFormatter={v=>"฿"+(v/1000).toFixed(0)+"k"}/><YAxis type="category" dataKey="name" tick={{fontSize:10,fill:"#9A9080"}} width={78}/><Tooltip formatter={v=>["฿"+v.toLocaleString(),"Revenue"]}/><Bar dataKey="rev" fill={GRN} radius={[0,5,5,0]}/></BarChart></ResponsiveContainer>
                </div>
              </div>
              <div style={{background:"#fff",borderRadius:16,padding:18,border:"1px solid #E8E0D0"}}>
                <h3 style={{fontSize:".95rem",fontWeight:700,marginBottom:12}}>Service Breakdown</h3>
                <table style={{width:"100%",borderCollapse:"collapse"}}>
                  <thead><tr style={{borderBottom:"1px solid #E8E0D0"}}>{["Service","Bookings","Revenue","Avg/Booking"].map(h=><th key={h} style={{...th,padding:"8px 0"}}>{h}</th>)}</tr></thead>
                  <tbody>{SVC_STATS.map(s=><tr key={s.name} style={{borderBottom:"1px solid #F5F0E8"}}><td style={{...td,padding:"9px 0",fontWeight:600}}>{s.name}</td><td style={{...td,padding:"9px 0",color:"#7A6E63"}}>{s.bks}</td><td style={{...td,padding:"9px 0",fontWeight:700,color:GOLD}}>฿{s.rev.toLocaleString()}</td><td style={{...td,padding:"9px 0",color:"#7A6E63"}}>฿{Math.round(s.rev/s.bks).toLocaleString()}</td></tr>)}</tbody>
                </table>
              </div>
            </div>
          )}

          {tab==="customers"&&(
            <div>
              <h2 style={{fontSize:"1.35rem",fontWeight:700,marginBottom:18,color:"#1C1915"}}>{t.cus}</h2>
              <div style={{background:"#fff",borderRadius:16,border:"1px solid #E8E0D0",overflow:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",minWidth:600}}>
                  <thead><tr style={{background:"#F8F7F4",borderBottom:"1px solid #E8E0D0"}}>{["Customer","Email","Bookings","Total Spent","Last Visit"].map(h=><th key={h} style={th}>{h}</th>)}</tr></thead>
                  <tbody>{[...new Map(ADM_BOOKINGS.map(b=>[b.email,b])).values()].map(b=>(
                    <tr key={b.email} style={{borderBottom:"1px solid #F5F0E8"}}>
                      <td style={{...td,fontWeight:600}}>{b.cust}</td>
                      <td style={{...td,fontSize:13,color:"#7A6E63"}}>{b.email}</td>
                      <td style={{...td,textAlign:"center",fontWeight:700}}>{ADM_BOOKINGS.filter(bk=>bk.email===b.email).length}</td>
                      <td style={{...td,fontWeight:700,color:GOLD}}>฿{ADM_BOOKINGS.filter(bk=>bk.email===b.email&&bk.pay==="PAID").reduce((s,bk)=>s+bk.price,0).toLocaleString()}</td>
                      <td style={{...td,fontSize:13,color:"#7A6E63"}}>{b.date}</td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App(){
  const[lang,setLang]=useState("en");
  const[dark,setDark]=useState(false);
  const[menu,setMenu]=useState(false);
  const[ck,setCk]=useState(false);
  const[hero,setHero]=useState(0);
  const[top,setTop]=useState(false);
  const[sec,setSec]=useState("home");
  const[lb,setLb]=useState(null);
  const[faqI,setFaqI]=useState(null);
  const[svcDur,setSvcDur]=useState({});
  const[nl,setNl]=useState("");const[nlDone,setNlDone]=useState(false);
  const[cf,setCf]=useState({n:"",e:"",m:""});const[cfDone,setCfDone]=useState(false);
  const[adminMode,setAdminMode]=useState(false);
  const[adminIn,setAdminIn]=useState(false);
  const t=TR[lang];
  const refs=Object.fromEntries(SECS.map(k=>[k,useRef()]));
  const HS=[
    {bg:"linear-gradient(145deg,#081408,#143020,#245838,#0E2418)",a:"#4A9A60"},
    {bg:"linear-gradient(145deg,#140808,#302014,#583824,#241410)",a:"#C9A84C"},
    {bg:"linear-gradient(145deg,#08080E,#141428,#242458,#0E0E28)",a:"#7A6ABE"},
  ];
  const bg=dark?"#0C0B08":"#FAFAF7",sf=dark?"#181610":"#FFFFFF",tx=dark?"#F0EDE6":"#1C1915",mu=dark?"#9A9080":"#7A6E63",be=dark?"#201E14":"#F5F0E8",bd=dark?"#2E2C20":"#E8E0D0";
  const gold=GOLD,dg=DG;

  useEffect(()=>{const id=setInterval(()=>setHero(h=>(h+1)%3),5500);return()=>clearInterval(id);},[]);
  useEffect(()=>{
    const fn=()=>{
      setTop(window.scrollY>400);
      for(const k of[...SECS].reverse()){if(refs[k]?.current&&refs[k].current.getBoundingClientRect().top<=120){setSec(k);break;}}
    };
    window.addEventListener("scroll",fn,{passive:true});
    return()=>window.removeEventListener("scroll",fn);
  },[]);

  const go=k=>{refs[k]?.current?.scrollIntoView({behavior:"smooth"});setMenu(false);};
  const svcs=useMemo(()=>SVCS.map(s=>({...s,name:s[lang]||s.en,desc:s.desc})),[lang]);
  const inp={width:"100%",background:sf,border:`1px solid ${bd}`,borderRadius:12,padding:"11px 14px",fontSize:14,color:tx,fontFamily:"inherit",outline:"none",boxSizing:"border-box"};

  if(adminMode){
    if(!adminIn)return <AdminLogin t={t.adm} onLogin={()=>setAdminIn(true)}/>;
    return <AdminDash t={t.adm} onLogout={()=>{setAdminMode(false);setAdminIn(false);}}/>;
  }

  return(
    <div style={{background:bg,color:tx,fontFamily:"Georgia,'Times New Roman',serif",minHeight:"100vh",overflowX:"hidden",transition:"background .3s,color .3s"}}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:${gold};border-radius:3px}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spinR{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        .NL{background:none;border:none;cursor:pointer;color:${mu};padding:5px 10px;border-radius:8px;font-size:13px;font-family:inherit;transition:color .2s;white-space:nowrap}
        .NL:hover,.NL.A{color:${gold};font-weight:700}
        .GB{background:linear-gradient(135deg,${gold},${dg});color:#fff;border:none;border-radius:50px;padding:13px 26px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;transition:all .3s;box-shadow:0 4px 18px ${gold}55;letter-spacing:.03em}
        .GB:hover{transform:translateY(-2px);box-shadow:0 8px 28px ${gold}70}
        .WB{background:#25D366;color:#fff;border:none;border-radius:50px;padding:12px 18px;font-size:13px;cursor:pointer;font-family:inherit;font-weight:700;transition:all .3s}
        .WB:hover{background:#1ebe5d;transform:translateY(-1px)}
        .LB{background:#00B900;color:#fff;border:none;border-radius:50px;padding:12px 18px;font-size:13px;cursor:pointer;font-family:inherit;font-weight:700;transition:all .3s}
        .LB:hover{transform:translateY(-1px)}
        .OB{background:rgba(255,255,255,.12);color:#fff;border:1px solid rgba(255,255,255,.35);border-radius:50px;padding:12px 22px;font-size:13px;cursor:pointer;font-family:inherit;backdrop-filter:blur(8px);transition:all .3s}
        .OB:hover{background:rgba(255,255,255,.22);transform:translateY(-1px)}
        .card{background:${sf};border:1px solid ${bd};border-radius:20px;padding:24px;transition:all .3s}
        .card:hover{transform:translateY(-4px);box-shadow:0 16px 48px rgba(0,0,0,.13)}
        .LNB{background:none;border:1px solid ${bd};color:${mu};cursor:pointer;padding:4px 9px;border-radius:16px;font-size:11px;font-family:inherit;transition:all .2s;white-space:nowrap}
        .LNB:hover{border-color:${gold};color:${gold}}
        .LNB.S{background:${gold};color:#fff;border-color:${gold}}
        .FAB{width:52px;height:52px;border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:21px;box-shadow:0 5px 22px rgba(0,0,0,.3);transition:all .3s;text-decoration:none}
        .FAB:hover{transform:scale(1.12)}
        .GC{columns:3 200px;column-gap:12px}
        .GI{break-inside:avoid;margin-bottom:12px;border-radius:18px;overflow:hidden;cursor:pointer;position:relative;display:block}
        .GI:hover .GO{opacity:1!important}
        .GI:hover .GIM{transform:scale(1.04)}
        .GIM{transition:transform .5s ease}
        input:focus,select:focus,textarea:focus{border-color:${gold}!important;outline:none}
        @media(max-width:860px){.DN{display:none!important}.HM{display:flex!important}.AGR{grid-template-columns:1fr!important}.CGR{grid-template-columns:1fr!important}}
        @media(max-width:600px){.GC{columns:2!important}.HB{flex-direction:column;align-items:center}}
        @media(max-width:360px){.GC{columns:1!important}}
      `}</style>

      {/* NAV */}
      <header style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,background:dark?"rgba(12,11,8,.97)":"rgba(250,250,247,.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${bd}`,height:62,display:"flex",alignItems:"center",padding:"0 18px",gap:10,justifyContent:"space-between"}}>
        <button onClick={()=>go("home")} style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",background:"none",border:"none",flexShrink:0,fontFamily:"inherit"}}>
          <div style={{width:38,height:38,borderRadius:11,background:`linear-gradient(135deg,${gold},${dg})`,display:"flex",alignItems:"center",justifyContent:"center"}}><Lotus s={24} c="#fff"/></div>
          <div style={{textAlign:"left"}}>
            <div style={{fontSize:17,fontWeight:700,color:gold,letterSpacing:".02em"}}>Mayara</div>
            <div style={{fontSize:10,color:mu,letterSpacing:".1em",textTransform:"uppercase"}}>Thai Massage · Bangkok</div>
          </div>
        </button>
        <nav className="DN" style={{display:"flex",gap:2,alignItems:"center"}}>
          {SECS.map(k=><button key={k} className={`NL${sec===k?" A":""}`} onClick={()=>go(k)}>{t.nav[k]}</button>)}
          <button onClick={()=>setAdminMode(true)} style={{background:"none",border:"none",cursor:"pointer",fontSize:16,padding:"4px 8px",opacity:.4}} title="Admin">🔐</button>
        </nav>
        <div style={{display:"flex",gap:4,alignItems:"center",flexShrink:0}}>
          <div style={{display:"flex",gap:3}}>{LANGS.map(([c,l])=><button key={c} className={`LNB${lang===c?" S":""}`} onClick={()=>setLang(c)}>{l}</button>)}</div>
          <button onClick={()=>setDark(d=>!d)} style={{background:"none",border:"none",cursor:"pointer",fontSize:16,padding:6,color:mu}}>{dark?"☀️":"🌙"}</button>
          <button className="HM" onClick={()=>setMenu(m=>!m)} style={{background:"none",border:"none",cursor:"pointer",fontSize:20,color:tx,padding:6,display:"none"}}>{menu?"✕":"☰"}</button>
        </div>
      </header>

      {menu&&<div style={{position:"fixed",top:62,left:0,right:0,background:dark?"rgba(12,11,8,.98)":"rgba(250,250,247,.98)",backdropFilter:"blur(16px)",zIndex:999,padding:"10px 20px 20px",borderBottom:`1px solid ${bd}`}}>
        {SECS.map(k=><div key={k} style={{padding:"10px 0",borderBottom:`1px solid ${bd}`}}><button className="NL" style={{fontSize:15}} onClick={()=>go(k)}>{t.nav[k]}</button></div>)}
        <div style={{display:"flex",gap:6,flexWrap:"wrap",paddingTop:10}}>{LANGS.map(([c,l])=><button key={c} className={`LNB${lang===c?" S":""}`} onClick={()=>setLang(c)}>{l}</button>)}</div>
      </div>}

      {/* HERO */}
      <section ref={refs.home} style={{height:"100vh",position:"relative",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
        {HS.map((s,i)=>(
          <div key={i} style={{position:"absolute",inset:0,background:s.bg,opacity:hero===i?1:0,transition:"opacity 2s",zIndex:hero===i?1:0}}>
            <div style={{position:"absolute",width:600,height:600,borderRadius:"50%",background:`radial-gradient(circle,${s.a}18,transparent 70%)`,top:"-10%",left:"-5%"}}/>
            <div style={{position:"absolute",width:500,height:500,borderRadius:"50%",background:`radial-gradient(circle,${gold}10,transparent 70%)`,bottom:0,right:"-5%"}}/>
            <div style={{position:"absolute",inset:0,backgroundImage:`linear-gradient(rgba(201,168,76,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,.03) 1px,transparent 1px)`,backgroundSize:"60px 60px"}}/>
          </div>
        ))}
        <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.36)",zIndex:2}}/>
        <div style={{position:"relative",zIndex:3,textAlign:"center",maxWidth:780,padding:"0 24px",animation:"fadeUp 1.2s ease-out"}}>
          <div style={{display:"inline-block",animation:"float 3.5s ease-in-out infinite",marginBottom:14}}><Lotus s={60} c={gold}/></div>
          <div style={{display:"block",background:`${gold}25`,border:`1px solid ${gold}55`,color:"#F0D882",borderRadius:50,padding:"6px 22px",fontSize:11,letterSpacing:".18em",textTransform:"uppercase",marginBottom:18,width:"fit-content",margin:"0 auto 18px"}}>✦ Bangkok's Premier Thai Massage ✦</div>
          <h1 style={{fontSize:"clamp(1.9rem,5.5vw,3.8rem)",fontWeight:700,color:"#fff",lineHeight:1.15,marginBottom:16,textShadow:"0 2px 30px rgba(0,0,0,.6)",fontFamily:"Palatino Linotype,Book Antiqua,Palatino,Georgia,serif"}}>{t.hero.h}</h1>
          <p style={{fontSize:"clamp(.9rem,2vw,1.15rem)",color:"rgba(255,255,255,.82)",lineHeight:1.85,maxWidth:580,margin:"0 auto 26px"}}>{t.hero.s}</p>
          <div className="HB" style={{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center",marginBottom:24}}>
            <button className="GB" onClick={()=>go("booking")}>🗓 {t.hero.book}</button>
            <a href={"tel:+6694423945"} style={{textDecoration:"none"}}><button className="OB">📞 {t.hero.call}</button></a>
            <a href={SOC.wa} target="_blank" rel="noreferrer" style={{textDecoration:"none"}}><button className="WB">💬 {t.hero.wa}</button></a>
            <a href={SOC.line} target="_blank" rel="noreferrer" style={{textDecoration:"none"}}><button className="LB">💚 {t.hero.line}</button></a>
          </div>
          <div style={{display:"inline-flex",alignItems:"center",gap:10,background:"rgba(255,255,255,.1)",backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,.22)",borderRadius:50,padding:"10px 22px",color:"#fff",fontSize:13}}>
            <span>⭐⭐⭐⭐⭐</span><span style={{fontWeight:800,color:"#FFD060",fontSize:16}}>{BIZ.rating}</span><span style={{opacity:.8}}>{BIZ.reviews}+ {t.hero.r}</span>
          </div>
        </div>
        <div style={{position:"absolute",bottom:28,left:"50%",transform:"translateX(-50%)",display:"flex",gap:8,zIndex:4}}>
          {[0,1,2].map(i=><button key={i} onClick={()=>setHero(i)} style={{width:i===hero?28:8,height:8,borderRadius:4,border:"none",background:i===hero?"rgba(255,255,255,.9)":"rgba(255,255,255,.3)",cursor:"pointer",transition:"all .4s",padding:0}}/>)}
        </div>
        <svg viewBox="0 0 1440 80" style={{position:"absolute",bottom:0,left:0,right:0,width:"100%",zIndex:3}} preserveAspectRatio="none">
          <path d="M0,60 C360,10 720,80 1080,40 C1260,20 1380,55 1440,60 L1440,80 L0,80Z" fill={bg}/>
        </svg>
      </section>

      {/* STATS */}
      <section style={{background:be,padding:"70px 24px"}}>
        <div style={{maxWidth:1100,margin:"0 auto",textAlign:"center"}}>
          <SectionHdr label="Our Story" title={t.about.t} sub={t.about.p1} gold={gold} mu={mu} tx={tx}/>
          <div style={{display:"flex",justifyContent:"center",gap:48,flexWrap:"wrap",marginTop:10}}>
            {[["500+","Happy Clients / Month"],["10+","Expert Therapists"],["5.0 ★","Google Rating"],["10+","Years of Excellence"]].map(([n,l])=>(
              <div key={l} style={{textAlign:"center"}}>
                <div style={{fontSize:"2.2rem",fontWeight:800,color:gold,fontFamily:"Palatino Linotype,Palatino,Georgia,serif"}}>{n}</div>
                <div style={{fontSize:11,color:mu,letterSpacing:".07em",textTransform:"uppercase",marginTop:5,maxWidth:100}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section ref={refs.about} style={{background:sf,padding:"80px 24px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <SectionHdr label="About Us" title={t.about.t} sub={t.about.s} gold={gold} mu={mu} tx={tx}/>
          <div className="AGR" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:52,alignItems:"center"}}>
            <div style={{borderRadius:24,overflow:"hidden",position:"relative",aspectRatio:"4/3",background:"linear-gradient(145deg,#0D2414,#183A20,#2A5E38,#183020)",boxShadow:"0 24px 64px rgba(0,0,0,.22)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:36}}>
              {[140,110,80,50].map((sz,i)=><div key={i} style={{position:"absolute",width:`${sz}%`,height:`${sz}%`,borderRadius:"50%",border:`1px solid rgba(201,168,76,${.06+i*.03})`,top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}/>)}
              {[0,60,120,180,240,300].map((deg,i)=><div key={i} style={{position:"absolute",width:6,height:18,borderRadius:"50%",background:`${gold}50`,top:"50%",left:"50%",transformOrigin:"0 55px",transform:`rotate(${deg}deg)`,animation:`spinR ${9+i}s linear infinite`}}/>)}
              <div style={{position:"relative",zIndex:2,animation:"float 3.5s ease-in-out infinite"}}><Lotus s={88} c={gold}/></div>
              <div style={{position:"relative",zIndex:2,color:gold,fontWeight:700,fontSize:"1.1rem",marginTop:18,textAlign:"center"}}>Authentic Thai Wellness</div>
              <div style={{position:"relative",zIndex:2,color:"rgba(255,255,255,.5)",fontSize:".78rem",marginTop:6,letterSpacing:".12em",textTransform:"uppercase"}}>Est. 2014 · Bangkok</div>
              <div style={{position:"relative",zIndex:2,display:"flex",gap:14,marginTop:22}}>
                {["🌿","🕯️","🌸","🙏"].map(e=><div key={e} style={{width:44,height:44,borderRadius:12,background:"rgba(201,168,76,.15)",border:"1px solid rgba(201,168,76,.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{e}</div>)}
              </div>
            </div>
            <div>
              {[t.about.p1,t.about.p2,t.about.p3].map((p,i)=><p key={i} style={{color:mu,lineHeight:1.9,marginBottom:14}}>{p}</p>)}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginTop:12}}>
                {t.about.f.map((label,i)=>(
                  <div key={i} style={{background:be,borderRadius:14,padding:"14px 16px",display:"flex",alignItems:"center",gap:12,border:`1px solid ${bd}`}}>
                    <div style={{width:38,height:38,borderRadius:10,background:`${gold}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{["🏅","🌿","✨","⭐"][i]}</div>
                    <div style={{fontWeight:600,fontSize:".88rem",color:tx}}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section ref={refs.services} style={{background:be,padding:"80px 24px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <SectionHdr label="Treatments" title={t.svc.t} sub={t.svc.s} gold={gold} mu={mu} tx={tx}/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:18}}>
            {svcs.map((s)=>{
              const ds=Object.keys(s.p).map(Number);
              const sel=svcDur[s.id]??ds[0];
              return(
                <div key={s.id} className="card" style={{background:`linear-gradient(145deg,${s.color}12,${s.color}04)`,border:`1px solid ${bd}`}}>
                  <div style={{fontSize:38,marginBottom:10}}>{s.icon}</div>
                  <div style={{fontWeight:700,fontSize:"1.05rem",color:tx,marginBottom:8}}>{s.name}</div>
                  <div style={{color:mu,fontSize:".87rem",lineHeight:1.7,marginBottom:16}}>{s.desc}</div>
                  <div style={{fontSize:11,color:mu,fontWeight:700,letterSpacing:".07em",textTransform:"uppercase",marginBottom:8}}>{t.svc.dur}</div>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
                    {ds.map(d=><button key={d} onClick={()=>setSvcDur(p=>({...p,[s.id]:d}))} style={{border:`1px solid ${sel===d?s.color:bd}`,borderRadius:20,padding:"5px 12px",fontSize:12,color:sel===d?"#fff":mu,cursor:"pointer",background:sel===d?s.color:be,fontWeight:sel===d?700:400,fontFamily:"inherit",transition:"all .2s"}}>{d}{t.svc.min} — ฿{s.p[d]}</button>)}
                  </div>
                  <button onClick={()=>go("booking")}
                    style={{display:"block",width:"100%",background:`${s.color}20`,color:s.color,border:`1px solid ${s.color}50`,borderRadius:12,padding:"10px",fontSize:13,fontWeight:700,cursor:"pointer",textAlign:"center",transition:"all .3s",fontFamily:"inherit"}}
                    onMouseOver={e=>{e.currentTarget.style.background=s.color;e.currentTarget.style.color="#fff";}}
                    onMouseOut={e=>{e.currentTarget.style.background=`${s.color}20`;e.currentTarget.style.color=s.color;}}>
                    {t.svc.bk} →
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section ref={refs.booking} style={{background:sf,padding:"80px 24px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <SectionHdr label="Reservations" title={t.bk.t} sub={t.bk.s} gold={gold} mu={mu} tx={tx}/>
          <div style={{background:be,borderRadius:28,padding:"44px 40px",maxWidth:820,margin:"0 auto",boxShadow:"0 20px 60px rgba(0,0,0,.07)",border:`1px solid ${bd}`}}>
            <BookingWizard t={t.bk} svcs={svcs} sf={sf} bd={bd} be={be} tx={tx} mu={mu} gold={gold} dg={dg}/>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section ref={refs.gallery} style={{background:be,padding:"80px 24px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <SectionHdr label="Photo Gallery" title={t.gal.t} sub={t.gal.s} gold={gold} mu={mu} tx={tx}/>
          <div className="GC">
            {GALLERY.map((p,i)=>(
              <div key={p.id} className="GI" onClick={()=>setLb(i)}>
                <div className="GIM" style={{width:"100%",minHeight:p.h,background:p.bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,position:"relative",overflow:"hidden"}}>
                  {[120,85].map((sz,j)=><div key={j} style={{position:"absolute",width:`${sz}%`,height:`${sz}%`,borderRadius:"50%",border:"1px solid rgba(201,168,76,.12)",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}/>)}
                  <div style={{fontSize:52,filter:"drop-shadow(0 4px 14px rgba(0,0,0,.5))",position:"relative",zIndex:1,animation:"float 4s ease-in-out infinite"}}>{p.icon}</div>
                  <div style={{color:`${gold}F0`,fontWeight:700,fontSize:"1rem",textAlign:"center",marginTop:12,position:"relative",zIndex:1}}>{p.title}</div>
                  <div style={{color:"rgba(255,255,255,.45)",fontSize:".75rem",marginTop:4,position:"relative",zIndex:1,letterSpacing:".08em",textTransform:"uppercase"}}>{p.sub}</div>
                </div>
                <div className="GO" style={{position:"absolute",inset:0,background:"rgba(0,0,0,.45)",display:"flex",alignItems:"center",justifyContent:"center",opacity:0,transition:"opacity .3s",borderRadius:18}}>
                  <div style={{background:"rgba(255,255,255,.15)",border:"1px solid rgba(255,255,255,.3)",borderRadius:"50%",width:52,height:52,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>🔍</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {lb!==null&&(
        <div onClick={()=>setLb(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.94)",zIndex:3000,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
          <button onClick={e=>{e.stopPropagation();setLb(l=>(l-1+GALLERY.length)%GALLERY.length);}} style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.2)",color:"#fff",fontSize:30,width:52,height:52,borderRadius:"50%",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>‹</button>
          <div onClick={e=>e.stopPropagation()} style={{borderRadius:24,overflow:"hidden",maxWidth:"min(480px,90vw)",width:"100%"}}>
            <div style={{background:GALLERY[lb].bg,minHeight:380,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:44,position:"relative"}}>
              {[130,90].map((sz,j)=><div key={j} style={{position:"absolute",width:`${sz}%`,height:`${sz}%`,borderRadius:"50%",border:"1px solid rgba(201,168,76,.15)",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}/>)}
              <div style={{fontSize:100,position:"relative",zIndex:1}}>{GALLERY[lb].icon}</div>
              <div style={{color:`${gold}F8`,fontWeight:700,fontSize:"1.4rem",textAlign:"center",marginTop:20,position:"relative",zIndex:1}}>{GALLERY[lb].title}</div>
              <div style={{color:"rgba(255,255,255,.55)",fontSize:".9rem",marginTop:8,position:"relative",zIndex:1,letterSpacing:".1em",textTransform:"uppercase"}}>{GALLERY[lb].sub}</div>
            </div>
          </div>
          <button onClick={e=>{e.stopPropagation();setLb(l=>(l+1)%GALLERY.length);}} style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.2)",color:"#fff",fontSize:30,width:52,height:52,borderRadius:"50%",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>›</button>
          <button onClick={()=>setLb(null)} style={{position:"absolute",top:16,right:16,background:"rgba(255,255,255,.1)",border:"none",color:"#fff",fontSize:18,width:42,height:42,borderRadius:"50%",cursor:"pointer"}}>✕</button>
          <div style={{position:"absolute",bottom:24,display:"flex",gap:8}}>{GALLERY.map((_,i)=><button key={i} onClick={e=>{e.stopPropagation();setLb(i);}} style={{width:i===lb?24:8,height:8,borderRadius:4,border:"none",background:i===lb?"rgba(255,255,255,.9)":"rgba(255,255,255,.3)",cursor:"pointer",padding:0,transition:"all .3s"}}/>)}</div>
        </div>
      )}

      {/* REVIEWS */}
      <section ref={refs.reviews} style={{background:sf,padding:"80px 24px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <SectionHdr label="Testimonials" title={t.rev.t} sub={t.rev.s} gold={gold} mu={mu} tx={tx}/>
          <div style={{display:"flex",justifyContent:"center",marginBottom:24}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,background:be,border:`1px solid ${bd}`,borderRadius:50,padding:"8px 20px"}}>
              <span style={{color:gold}}>⭐⭐⭐⭐⭐</span><span style={{fontWeight:800,fontSize:16,color:gold}}>{BIZ.rating}</span><span style={{color:mu,fontSize:14}}>({BIZ.reviews}+ reviews)</span>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:18,marginBottom:32}}>
            {REVIEWS.map(r=>(
              <div key={r.id} className="card">
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                  <div style={{color:gold,fontSize:16}}>{"⭐".repeat(r.stars)}</div>
                  {r.google&&<span style={{background:"#EFF6FF",color:"#1D4ED8",padding:"2px 8px",borderRadius:20,fontSize:10,fontWeight:700}}>✓ Google</span>}
                </div>
                <p style={{color:mu,fontSize:".9rem",lineHeight:1.8,marginBottom:16,fontStyle:"italic"}}>"{r.text}"</p>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:40,height:40,borderRadius:"50%",background:`linear-gradient(135deg,${gold}30,${gold}10)`,border:`1px solid ${gold}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{r.flag}</div>
                  <div><div style={{fontWeight:700,fontSize:".92rem",color:tx}}>{r.name}</div><div style={{color:mu,fontSize:".8rem"}}>{r.loc}</div></div>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center"}}><a href={SOC.google} target="_blank" rel="noreferrer" style={{textDecoration:"none"}}><button style={{background:"linear-gradient(135deg,#4285F4,#34A853)",color:"#fff",border:"none",borderRadius:50,padding:"14px 32px",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"inherit",boxShadow:"0 4px 20px rgba(66,133,244,.4)"}}>⭐ {t.rev.leave}</button></a></div>
        </div>
      </section>

      {/* CONTACT */}
      <section ref={refs.contact} style={{background:be,padding:"80px 24px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <SectionHdr label="Get In Touch" title={t.cnt.t} sub={t.cnt.s} gold={gold} mu={mu} tx={tx}/>
          <div className="CGR" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:44}}>
            <div>
              <div style={{display:"flex",flexDirection:"column",gap:18,marginBottom:24}}>
                {[["📍","Address",BIZ.address],["📞","Phone",BIZ.phone],["✉️","Email",BIZ.email],["⏰","Hours",BIZ.hours]].map(([ic,lbl,val])=>(
                  <div key={lbl} style={{display:"flex",gap:14,alignItems:"flex-start"}}>
                    <div style={{width:44,height:44,borderRadius:12,background:`${gold}20`,border:`1px solid ${gold}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{ic}</div>
                    <div><div style={{fontWeight:700,color:tx,fontSize:".82rem",marginBottom:3,letterSpacing:".04em",textTransform:"uppercase"}}>{lbl}</div><div style={{color:mu,fontSize:".92rem",lineHeight:1.65}}>{val}</div></div>
                  </div>
                ))}
              </div>
              <div style={{fontWeight:700,color:tx,fontSize:".82rem",marginBottom:10,letterSpacing:".04em",textTransform:"uppercase"}}>Follow & Connect</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:20}}>
                {[["📘","Facebook",SOC.fb],["📸","Instagram",SOC.ig],["💚","LINE",SOC.line],["💬","WhatsApp",SOC.wa]].map(([ic,nm,href])=>(
                  <a key={nm} href={href} target="_blank" rel="noreferrer" style={{background:sf,border:`1px solid ${bd}`,borderRadius:10,padding:"8px 14px",fontSize:13,color:tx,textDecoration:"none",transition:"all .2s"}}
                    onMouseOver={e=>{e.currentTarget.style.borderColor=gold;e.currentTarget.style.color=gold;}}
                    onMouseOut={e=>{e.currentTarget.style.borderColor=bd;e.currentTarget.style.color=tx;}}>{ic} {nm}</a>
                ))}
              </div>
              <div style={{borderRadius:18,overflow:"hidden",border:`1px solid ${bd}`,marginBottom:10}}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15499.48!2d100.554!3d13.7644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDQ1JzUxLjgiTiAxMDDCsDMzJzEzLjMiRQ!5e0!3m2!1sen!2sth!4v1700000000000"
                  width="100%" height="200" style={{border:0,display:"block"}} loading="lazy" title="Mayara Location"/>
              </div>
              <a href="https://www.google.com/maps/dir/?api=1&destination=13.7644,100.554" target="_blank" rel="noreferrer"
                style={{display:"block",textAlign:"center",padding:"11px",background:gold,color:"#fff",borderRadius:12,fontWeight:700,fontSize:13,textDecoration:"none"}}>🗺️ {t.cnt.dir}</a>
            </div>
            <div style={{background:sf,borderRadius:22,padding:30,border:`1px solid ${bd}`,boxShadow:"0 12px 40px rgba(0,0,0,.06)"}}>
              <div style={{fontWeight:700,color:tx,fontSize:"1.05rem",marginBottom:20,display:"flex",alignItems:"center",gap:8}}><Lotus s={22} c={gold}/> Send a Message</div>
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                {[{k:"n",l:t.cnt.form.n,type:"text"},{k:"e",l:t.cnt.form.e,type:"email"}].map(({k,l,type})=>(
                  <div key={k}>
                    <label style={{display:"block",fontSize:11,fontWeight:700,textTransform:"uppercase",color:mu,marginBottom:6}}>{l}</label>
                    <input type={type} style={inp} value={cf[k]} onChange={e=>setCf(f=>({...f,[k]:e.target.value}))}/>
                  </div>
                ))}
                <div>
                  <label style={{display:"block",fontSize:11,fontWeight:700,textTransform:"uppercase",color:mu,marginBottom:6}}>{t.cnt.form.m}</label>
                  <textarea rows={4} style={{...inp,resize:"vertical",minHeight:90}} value={cf.m} onChange={e=>setCf(f=>({...f,m:e.target.value}))}/>
                </div>
                <button onClick={async()=>{await new Promise(r=>setTimeout(r,600));setCfDone(true);setCf({n:"",e:"",m:""});setTimeout(()=>setCfDone(false),5000);}}
                  style={{width:"100%",padding:"14px",background:`linear-gradient(135deg,${gold},${dg})`,color:"#fff",border:"none",borderRadius:12,fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"inherit"}}>
                  {t.cnt.form.s}
                </button>
                {cfDone&&<div style={{background:"#D1FAE5",border:"1px solid #86EFAC",borderRadius:12,padding:"13px",color:"#065F46",textAlign:"center",fontWeight:600}}>{t.cnt.form.ok}</div>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section ref={refs.faq} style={{background:sf,padding:"80px 24px"}}>
        <div style={{maxWidth:800,margin:"0 auto"}}>
          <SectionHdr label="FAQ" title={t.faq.t} sub={t.faq.s} gold={gold} mu={mu} tx={tx}/>
          {FAQS.map((item,i)=>(
            <div key={i} style={{border:`1px solid ${bd}`,borderRadius:16,overflow:"hidden",marginBottom:10}}>
              <button onClick={()=>setFaqI(faqI===i?null:i)}
                style={{width:"100%",background:sf,padding:"17px 22px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",border:"none",fontFamily:"inherit",fontWeight:600,fontSize:".95rem",color:tx,textAlign:"left",gap:12}}
                onMouseOver={e=>e.currentTarget.style.background=be} onMouseOut={e=>e.currentTarget.style.background=sf}>
                <span>{item.q}</span><span style={{color:gold,fontSize:22,flexShrink:0}}>{faqI===i?"−":"+"}</span>
              </button>
              {faqI===i&&<div style={{background:be,padding:"16px 22px",color:mu,fontSize:".9rem",lineHeight:1.8}}>{item.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section style={{padding:"0 24px 80px"}}>
        <div style={{maxWidth:1100,margin:"0 auto",background:`linear-gradient(145deg,${gold}18,${GRN}10,${gold}08)`,borderRadius:28,padding:"52px 40px",textAlign:"center",border:`1px solid ${gold}30`,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:-60,right:-60,width:220,height:220,borderRadius:"50%",background:`${gold}08`}}/>
          <div style={{position:"absolute",bottom:-60,left:-60,width:180,height:180,borderRadius:"50%",background:`${GRN}08`}}/>
          <div style={{position:"relative",zIndex:1}}>
            <div style={{animation:"float 3s ease-in-out infinite",display:"inline-block",marginBottom:8}}><Lotus s={48} c={gold}/></div>
            <h3 style={{fontSize:"1.8rem",fontWeight:700,margin:"10px 0 8px",fontFamily:"Palatino Linotype,Palatino,Georgia,serif",color:tx}}>{t.nl.t}</h3>
            <p style={{color:mu,marginBottom:24}}>{t.nl.s}</p>
            {nlDone?<div style={{background:"#D1FAE5",border:"1px solid #86EFAC",borderRadius:50,padding:"13px 30px",color:"#065F46",display:"inline-block",fontWeight:700}}>{t.nl.ok}</div>:(
              <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
                <input type="email" placeholder={t.nl.ph} value={nl} onChange={e=>setNl(e.target.value)}
                  style={{background:sf,border:`1px solid ${bd}`,borderRadius:50,padding:"13px 24px",fontSize:14,color:tx,fontFamily:"inherit",outline:"none",minWidth:260}}/>
                <button onClick={()=>{if(nl)setNlDone(true);}} className="GB" style={{borderRadius:50}}>{t.nl.btn}</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{background:dark?"#080806":"#161410",color:"#5A5240",padding:"52px 24px 28px",textAlign:"center"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:12,marginBottom:22}}>
            <div style={{width:44,height:44,borderRadius:12,background:`linear-gradient(135deg,${gold},${dg})`,display:"flex",alignItems:"center",justifyContent:"center"}}><Lotus s={26} c="#fff"/></div>
            <div>
              <div style={{fontSize:22,fontWeight:700,color:gold,fontFamily:"Palatino Linotype,Palatino,Georgia,serif"}}>{BIZ.name}</div>
              <div style={{fontSize:11,letterSpacing:".1em",textTransform:"uppercase",color:"#3A3020"}}>Bangkok, Thailand · Est. 2014</div>
            </div>
          </div>
          <div style={{display:"flex",gap:4,justifyContent:"center",flexWrap:"wrap",marginBottom:20}}>
            {SECS.map(k=><button key={k} onClick={()=>go(k)} style={{background:"none",border:"none",color:"#3A3020",cursor:"pointer",fontSize:13,fontFamily:"inherit",padding:"4px 10px",transition:"color .2s"}} onMouseOver={e=>e.currentTarget.style.color=gold} onMouseOut={e=>e.currentTarget.style.color="#3A3020"}>{t.nav[k]}</button>)}
          </div>
          <div style={{borderTop:"1px solid #201E14",paddingTop:18,fontSize:12,lineHeight:1.9}}>
            <p>{BIZ.address} · {BIZ.phone} · {BIZ.email}</p>
            <p style={{marginTop:4,color:"#302E20"}}>© {new Date().getFullYear()} {BIZ.name} · {t.ft.rights} · {t.ft.open}</p>
          </div>
        </div>
      </footer>

      {/* FLOATING BUTTONS */}
      <div style={{position:"fixed",bottom:24,right:20,display:"flex",flexDirection:"column",gap:10,zIndex:900}}>
        <button className="FAB" style={{background:`linear-gradient(135deg,${gold},${dg})`}} onClick={()=>go("booking")} title="Book Now">🗓</button>
        <a href={"tel:+6694423945"} className="FAB" style={{background:"#2563EB",textDecoration:"none"}} title="Call">📞</a>
        <a href={SOC.wa} target="_blank" rel="noreferrer" className="FAB" style={{background:"#25D366",textDecoration:"none"}} title="WhatsApp">💬</a>
        <a href={SOC.line} target="_blank" rel="noreferrer" className="FAB" style={{background:"#00B900",textDecoration:"none"}} title="LINE">💚</a>
      </div>

      {top&&<button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} style={{position:"fixed",bottom:24,left:20,width:46,height:46,borderRadius:"50%",background:gold,border:"none",color:"#fff",cursor:"pointer",fontSize:18,zIndex:900,boxShadow:`0 4px 18px ${gold}70`,display:"flex",alignItems:"center",justifyContent:"center"}}>↑</button>}

      {!ck&&<div style={{position:"fixed",bottom:0,left:0,right:0,background:dark?"#18160E":"#28241A",color:"#C8BFA8",padding:"14px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",zIndex:1100,flexWrap:"wrap",gap:12,borderTop:`1px solid ${gold}30`}}>
        <span style={{fontSize:13}}>🍪 {t.ck.t}</span>
        <div style={{display:"flex",gap:10}}>
          <button onClick={()=>setCk(true)} style={{background:gold,color:"#fff",border:"none",borderRadius:8,padding:"8px 18px",cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:13}}>{t.ck.a}</button>
          <button onClick={()=>setCk(true)} style={{background:"transparent",color:"#7A7060",border:"1px solid #4A4030",borderRadius:8,padding:"8px 14px",cursor:"pointer",fontFamily:"inherit",fontSize:13}}>{t.ck.d}</button>
        </div>
      </div>}
    </div>
  );
}
