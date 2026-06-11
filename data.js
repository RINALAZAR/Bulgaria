// ============================================================
// נתוני תיקי הנסיעות — רינה ומרדכי לזר 2026
// קובץ זה הוא "מקור האמת" של האתר.
// כל עדכון של טיסה / הזמנה / טיול מתבצע כאן (או דרך כפתורי
// ההוספה באתר עצמו, שנשמרים בדפדפן וניתנים לייצוא).
// מקור הנתונים: גיליון "מעודכן 10.6" (V8) + אישורי הזמנה במייל.
// ============================================================

window.TRIPS_DATA = {
  lastUpdated: "2026-06-11",
  travelers: ["רינה לזר", "מרדכי לזר"],
  trips: [
    {
      id: "YK5LMF",
      title: "נסיעה 1 · יוני–יולי",
      destination: "מילאנו מלפנסה (MXP)",
      bookingCode: "YK5LMF",
      airline: "Wizz Air",
      manageUrl: "https://www.wizzair.com/he-il/information-and-services/booking-information/check-in-and-boarding",
      status: "מאושר",
      price: "159.96 EUR",
      outbound: {
        date: "2026-06-15", depTime: "18:55", arrTime: "22:10",
        flightNo: "W4 6404", from: "תל אביב (TLV)", to: "מילאנו מלפנסה (MXP)"
      },
      inbound: {
        date: "2026-07-09", depTime: "13:05", arrTime: "18:00",
        flightNo: "W4 6403", from: "מילאנו מלפנסה (MXP)", to: "תל אביב (TLV)"
      },
      services: [
        {
          type: "מלון",
          name: "Crowne Plaza Milan – Malpensa Airport",
          date: "2026-07-15", endDate: "2026-07-16",
          ref: "49708163",
          note: "⚠️ לבדיקה: ההזמנה היא ל-15–16/7, אחרי מועד טיסת החזרה הנוכחי (9/7). ייתכן שנותרה מתוכנית קודמת — לבדוק מול המלון (שולם מראש, ללא החזר).",
          mapUrl: "https://maps.google.com/?q=Crowne+Plaza+Milan+Malpensa+Airport"
        }
      ],
      excursions: [
        {
          name: "דולומיטים יום 1: עמק ג'נובה ואגם טובל (22/6)",
          length: "ארוך", mode: "רכב + רגלי",
          desc: "נסיעה מקוסטה וולפינו לעמק ג'נובה דרך SS42 (כ-115 ק\"מ, 2.5 שעות). הליכה שטוחה למפלי נרדיס (2–3 ק\"מ הלוך-ושוב), המשך לאגם טובל (55 ק\"מ) והקפת האגם (כ-5 ק\"מ מעגלי). לינה באזור Mezzocorona.",
          driveUrl: "https://maps.google.com/?q=Val+di+Genova",
          wazeUrl: "https://waze.com/ul?q=Val%20di%20Genova&navigate=yes",
          komootUrl: "https://www.komoot.com/discover?q=Lago+di+Tovel+Loop",
          alltrailsUrl: "https://www.alltrails.com/explore?q=Lago+di+Tovel+Circular+Walk"
        },
        {
          name: "דולומיטים יום 2: רכס סצ'דה וזאנסר אלם (23/6)",
          length: "ארוך", mode: "רכב + רכבל + רגלי",
          desc: "נסיעה לאורטיזיי (כ-65 ק\"מ), עלייה ברכבל סצ'דה לגובה 2,500 מ' והליכת רכס 3–4 ק\"מ. ⚠️ מקיץ 2026 חובה להזמין משבצת זמן לרכבל מראש! המשך לואל די פונס — מסלול זאנסר אלם (כ-4 ק\"מ) ותצפית סנטה מגדלנה.",
          driveUrl: "https://maps.google.com/?q=Ortisei+Seceda+Cableway",
          wazeUrl: "https://waze.com/ul?q=Ortisei%20Seceda&navigate=yes",
          komootUrl: "https://www.komoot.com/discover?q=Seceda+Ridgeline+Walk",
          alltrailsUrl: "https://www.alltrails.com/explore?q=Seceda+Pieralongia"
        },
        {
          name: "דולומיטים יום 3: אלפה די סיוזי ואגם קארצה (24/6)",
          length: "ארוך", mode: "רכב + רכבל + רגלי",
          desc: "עלייה ברכבל מ-Seis am Schlern לרמה האלפינית הגבוהה באירופה — הליכה מישורית 5–6 ק\"מ מול הסאסולונגו. אחה\"צ: אגם קארצה (\"אגם הקשת בענן\") — הקפה קלה של 1.5 ק\"מ.",
          driveUrl: "https://maps.google.com/?q=Seis+am+Schlern+Cableway",
          wazeUrl: "https://waze.com/ul?q=Seis%20am%20Schlern&navigate=yes",
          komootUrl: "https://www.komoot.com/discover?q=Alpe+di+Siusi+Easy+Walk",
          alltrailsUrl: "https://www.alltrails.com/explore?q=Lago+di+Carezza+Loop"
        },
        {
          name: "דולומיטים יום 4: אגם מולבנו וחזרה (25/6)",
          length: "ארוך", mode: "רכב + רגלי",
          desc: "סיום טיול הכוכב בדולומיטים: אגם מולבנו — טיילת נינוחה לאורך החוף, וחזרה לקוסטה וולפינו.",
          driveUrl: "https://maps.google.com/?q=Lago+di+Molveno",
          wazeUrl: "https://waze.com/ul?q=Lago%20di%20Molveno&navigate=yes",
          komootUrl: "https://www.komoot.com/discover?q=Lago+di+Molveno",
          alltrailsUrl: "https://www.alltrails.com/explore?q=Lago+di+Molveno"
        }
      ]
    },
    {
      id: "VKLCKS",
      title: "נסיעה 2 · אוגוסט–ספטמבר",
      destination: "מילאנו מלפנסה (MXP)",
      bookingCode: "VKLCKS",
      airline: "Wizz Air",
      manageUrl: "https://www.wizzair.com/he-il/information-and-services/booking-information/check-in-and-boarding",
      status: "מאושר",
      price: "720.96 EUR",
      outbound: {
        date: "2026-08-14", depTime: "10:50", arrTime: "14:05",
        flightNo: "W4 6406", from: "תל אביב (TLV)", to: "מילאנו מלפנסה (MXP)"
      },
      inbound: {
        date: "2026-09-08", depTime: "13:05", arrTime: "18:00",
        flightNo: "W4 6403", from: "מילאנו מלפנסה (MXP)", to: "תל אביב (TLV)"
      },
      services: [],
      excursions: []
    },
    {
      id: "XT1YNX",
      title: "נסיעה 3 · ספטמבר–אוקטובר",
      destination: "מילאנו מלפנסה (MXP)",
      bookingCode: "XT1YNX",
      airline: "Wizz Air",
      manageUrl: "https://www.wizzair.com/he-il/information-and-services/booking-information/check-in-and-boarding",
      status: "מאושר",
      price: "",
      outbound: {
        date: "2026-09-26", depTime: "10:50", arrTime: "14:05",
        flightNo: "W4 6406", from: "תל אביב (TLV)", to: "מילאנו מלפנסה (MXP)"
      },
      inbound: {
        date: "2026-10-15", depTime: "13:05", arrTime: "18:00",
        flightNo: "W4 6403", from: "מילאנו מלפנסה (MXP)", to: "תל אביב (TLV)"
      },
      services: [],
      excursions: []
    },
    {
      id: "XVBLSF",
      title: "נסיעה 4 · אוקטובר–נובמבר",
      destination: "מילאנו מלפנסה (MXP)",
      bookingCode: "XVBLSF",
      airline: "אל על",
      manageUrl: "https://www.elal.com/he/manage-booking",
      status: "מאושר (כרטוס + מימוש נקודות)",
      price: "",
      outbound: {
        date: "2026-10-28", depTime: "06:40", arrTime: "09:55",
        flightNo: "LY381", from: "תל אביב (TLV)", to: "מילאנו מלפנסה (MXP)"
      },
      inbound: {
        date: "2026-11-17", depTime: "20:10", arrTime: "00:55",
        arrDate: "2026-11-18",
        flightNo: "LY388", from: "מילאנו מלפנסה (MXP)", to: "תל אביב (TLV)"
      },
      services: [],
      excursions: []
    }
  ]
};
