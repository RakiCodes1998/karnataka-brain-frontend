import { useState, useEffect, useRef } from "react";
import karnatakaMap from "./assets/map1.png";
import character from "./assets/maincharacter3.png";
import "./App.css";
import drRajkumar from "./assets/dr.RajkumarImage.png";
import huttidare from "./assets/huttidare2.m4a";

import introSong from "./assets/intro.m4a";
import region1Song from "./assets/region1.m4a";
import region2Song from "./assets/region2.m4a";
import region3Song from "./assets/region3.m4a";
import region4Song from "./assets/region4.m4a";
const BACKEND_URL = "https://karnataka-brain-backend.onrender.com";



const questions = {
    1: [
        {
            question: "ಚಾಮರಾಜನಗರ ಜಿಲ್ಲೆಯಲ್ಲಿ ಮುಖ್ಯವಾಗಿ ನೆಲೆಗೊಂಡಿರುವ ಪ್ರಸಿದ್ಧ ಹುಲಿ ಸಂರಕ್ಷಿತ ಪ್ರದೇಶ ಮತ್ತು ರಾಷ್ಟ್ರೀಯ ಉದ್ಯಾನವನ ಯಾವುದು?(Which famous tiger reserve and national park is primarily located in Chamarajanagar district?)",
            options: ["ನಾಗರಹೊಳೆ ರಾಷ್ಟ್ರೀಯ ಉದ್ಯಾನವನ(Nagarhole National Park)", "ಬಂಡೀಪುರ ರಾಷ್ಟ್ರೀಯ ಉದ್ಯಾನವನ(Bandipur National Park)", "ಕುದುರೆಮುಖ ರಾಷ್ಟ್ರೀಯ ಉದ್ಯಾನವನ(Kudremukh National Park)", "ಅಂಶಿ ರಾಷ್ಟ್ರೀಯ ಉದ್ಯಾನವನ(Anshi National Park)"],
            answer: "ಬಂಡೀಪುರ ರಾಷ್ಟ್ರೀಯ ಉದ್ಯಾನವನ(Bandipur National Park)"
        },
        {
            question: "ಚಾಮರಾಜನಗರ ಜಿಲ್ಲೆಯನ್ನು ಮೈಸೂರು ಜಿಲ್ಲೆಯಿಂದ ಪ್ರತ್ಯೇಕಿಸಿ ಹೊಸ ಜಿಲ್ಲೆಯಾಗಿ ರಚಿಸಿದ ವರ್ಷ ಯಾವುದು?(In which year was Chamarajanagar district carved out from the Mysuru (Mysore) district?)",
            options: ["1998", "1985", "2001", "1997"],
            answer: "1997"
        },
        {
            question: "ಹೊಯ್ಸಳ ಸಾಮ್ರಾಜ್ಯದ ಕಾಲದಲ್ಲಿ ನಿರ್ಮಿಸಲ್ಪಟ್ಟ ಮತ್ತು ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆಯ ತಾಣದ ಭಾಗವಾಗಿ ಗುರುತಿಸಲ್ಪಟ್ಟಿರುವ ಪ್ರಸಿದ್ಧ 13ನೇ ಶತಮಾನದ ಕೇಶವ ದೇವಾಲಯವು ಮೈಸೂರು ಜಿಲ್ಲೆಯ ಯಾವ ಪಟ್ಟಣದಲ್ಲಿ ಇದೆ?(The famous 13th-century Keshava Temple, built under the Hoysala Empire and recognized as part of a UNESCO World Heritage Site, is located in which town of Mysuru district?)",
            options: ["ತಲಕಾಡು(Talkad)", "ಸೋಮನಾಥಪುರ(Somanathapura)", "ನಂಜನಗೂಡು(Nanjangud)", "ಟಿ. ನರಸೀಪುರ(T. Narasipura)"],
            answer: "ಸೋಮನಾಥಪುರ(Somanathapura)"
        },
        {
            question: "ಮೈಸೂರು ಜಿಲ್ಲೆಯ ಪವಿತ್ರ ಕ್ಷೇತ್ರವಾದ ಟಿ. ನರಸೀಪುರದಲ್ಲಿ ಕಾವೇರಿ ನದಿ ಮತ್ತು ಪೌರಾಣಿಕ ಸ್ಪಟಿಕ ಸರೋವರದೊಂದಿಗೆ ಸಂಗಮಿಸುವ ಪ್ರಮುಖ ನದಿ ಯಾವುದು?(Which prominent river converges with the Cauvery and the mythical Spatika Sarovara at the sacred town of T. Narasipura in Mysuru district?)",
            options: ["ಶಿಂಷಾ(Shimsha)", "ಹೇಮಾವತಿ(Hemavati)", "ಕಬಿನಿ (ಕಪಿಲಾ)(Kabini (Kapila))", "ಅರ್ಕಾವತಿ(Arkavathi)"],
            answer: "ಕಬಿನಿ (ಕಪಿಲಾ)(Kabini (Kapila))"
        },
        {
            question: "ಮೈಸೂರು ನಗರವನ್ನು ಮೇಲಿನಿಂದ ನೋಡಬಹುದಾದ ಬೆಟ್ಟದ ಮೇಲಿರುವ, ವಾಡಿಯಾರ್ ರಾಜವಂಶದ ಕುಲದೇವತೆಯಾದ ದೇವಿಗೆ ಸಮರ್ಪಿತವಾದ ಪ್ರಸಿದ್ಧ ದೇವಾಲಯ ಯಾವುದು?(Which famous temple dedicated to the tutelary deity of the Wadiyars is situated atop the hills overlooking Mysuru city?)",
            options: ["ಚಾಮುಂಡೇಶ್ವರಿ ದೇವಾಲಯ(Chamundeshwari Temple)", "ಚೆಲುವನಾರಾಯಣ ಸ್ವಾಮಿ ದೇವಾಲಯ(Cheluvanarayana Swamy Temple)", "ಕುಕ್ಕೆ ಸುಬ್ರಹ್ಮಣ್ಯ ದೇವಾಲಯ(Kukke Subramanya Temple)", "ಬನಶಂಕರಿ ದೇವಾಲಯ(Banashankari Temple)"],
            answer: "ಚಾಮುಂಡೇಶ್ವರಿ ದೇವಾಲಯ(Chamundeshwari Temple)"
        },
        {
            question: "ಮಂಡ್ಯ ಜಿಲ್ಲೆಯನ್ನು ಮೈಸೂರು ಜಿಲ್ಲೆಯಿಂದ ಪ್ರತ್ಯೇಕಿಸಿ ಸ್ವತಂತ್ರ ಜಿಲ್ಲೆಯಾಗಿ ರಚಿಸಿದ ವರ್ಷ ಯಾವುದು?(In which year was Mandya carved out of the Mysore district to become an independent district?)",
            options: ["1947", "1956", "1939", "1973"],
            answer: "1939"
        },
        {
            question: "ಹೊಯ್ಸಳರ ಕಾಲದಲ್ಲಿ ನಿರ್ಮಿಸಲಾದ ಐತಿಹಾಸಿಕ 12ನೇ ಶತಮಾನದ ಸೌಮ್ಯಕೇಶವ ದೇವಾಲಯವು ಮಂಡ್ಯ ಜಿಲ್ಲೆಯ ಯಾವ ಪಟ್ಟಣದಲ್ಲಿ ಇದೆ?(The historic 12th-century Saumyakeshava Temple, built during the Hoysala period, is located in which town of Mandya district?)",
            options: ["ಮದ್ದೂರು(Maddur)", "ನಾಗಮಂಗಲ(Nagamangala)", "ಮಳವಳ್ಳಿ(Malavalli)", "ಪಾಂಡವಪುರ(Pandavapura)"],
            answer: "ನಾಗಮಂಗಲ(Nagamangala)"
        },
        {
            question: "ಏಷ್ಯಾದ ಅತಿ ದೊಡ್ಡ ಏಕಶಿಲಾ ಬಂಡೆ ರಚನೆಗಳಲ್ಲಿ ಒಂದೆಂದು ಪರಿಗಣಿಸಲ್ಪಡುವ, ರಾಮನಗರ ಜಿಲ್ಲೆಯಲ್ಲಿರುವ ಏಕಶಿಲಾ ಬೆಟ್ಟ ಯಾವುದು?(Which monolithic hill located in Ramanagara district is considered one of the largest single rock formations (monoliths) in Asia?)",
            options: ["ಮಧುಗಿರಿ(Madhugiri)", "ಶಿವಗಂಗೆ(Shivagange)", "ಸಾವನದುರ್ಗ(Savandurga)", "ಸ್ಕಂದಗಿರಿ(Skandagiri)"],
            answer: "ಸಾವನದುರ್ಗ(Savandurga)"
        },
        {
            question: "ಕೋಲಾರ ಜಿಲ್ಲೆಯ ಎಪಿಎಂಸಿ ಮಾರುಕಟ್ಟೆಯು ಏಷ್ಯಾದ ಎರಡನೇ ಅತಿದೊಡ್ಡ ಮಾರುಕಟ್ಟೆ ಎಂದು ಯಾವ ಕೃಷಿ ಉತ್ಪನ್ನಕ್ಕಾಗಿ ಪ್ರಸಿದ್ಧವಾಗಿದೆ?(The APMC market in Kolar district is considered the second largest market in Asia for which agricultural commodity?)",
            options: ["ಆಲೂಗಡ್ಡೆ(Potato)", "ಟೊಮ್ಯಾಟೊ(Tomato)", "ಈರುಳ್ಳಿ(Onion)", "ಹಸಿರು ಮೆಣಸಿನಕಾಯಿ(Green chilli)"],
            answer: "ಟೊಮ್ಯಾಟೊ(Tomato)"
        },
        {
            question: "ಕೋಟ್ಯಂತರ ಶಿವಲಿಂಗಗಳು ಮತ್ತು 108 ಅಡಿ ಎತ್ತರದ ಬೃಹತ್ ಶಿವಲಿಂಗವನ್ನು ಹೊಂದಿರುವ ಪ್ರಸಿದ್ಧ ಕೋಟಿಲಿಂಗೇಶ್ವರ ದೇವಾಲಯವು ಕೋಲಾರ ಜಿಲ್ಲೆಯ ಯಾವ ಗ್ರಾಮದಲ್ಲಿದೆ?(The famous Kotilingeshwara Temple, which houses millions of Shiva Lingas and a massive 108-foot Linga, is located in which village of Kolar district?)",
            options: ["ಕಮ್ಮಸಂದ್ರ(Kammasandra)", "ಕುರಡುಮಲೆ(Kurudumale)", "ಆವಣಿ(Avani)", "ಕೈವಾರ(Kaiwara)"],
            answer: "ಕಮ್ಮಸಂದ್ರ(Kammasandra)"
        },

        {
            question: "ಹಳೆಯ ಬೆಂಗಳೂರು ಜಿಲ್ಲೆಯನ್ನು ಬೆಂಗಳೂರು ನಗರ ಮತ್ತು ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ ಜಿಲ್ಲೆಗಳಾಗಿ ಅಧಿಕೃತವಾಗಿ ವಿಭಜಿಸಿದ ವರ್ಷ ಯಾವುದು?(In which year was the old Bangalore district officially bifurcated into Bangalore Urban and Bangalore Rural districts?)",
            options: ["1991", "1986", "1997", "1998"],
            answer: "1986"
        },
        {
            question: "ನಂದಿ ಬೆಟ್ಟಗಳ ಪ್ರದೇಶದಲ್ಲಿ ಹುಟ್ಟಿ ಬೆಂಗಳೂರು ನಗರ ಮತ್ತು ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ ಜಿಲ್ಲೆಗಳ ಕೆಲವು ಭಾಗಗಳ ಮೂಲಕ ಹರಿಯುವ ನದಿ ಯಾವುದು?(Which river originates in the Nandi Hills region and flows through parts of the Bengaluru Urban and Rural districts?)",
            options: ["ಹೇಮಾವತಿ(Hemavati)", "ಮಲಪ್ರಭಾ(Malaprabha)", "ತುಂಗಾ(Tunga)", "ಅರ್ಕಾವತಿ(Arkavathi)"],
            answer: "ಅರ್ಕಾವತಿ(Arkavathi)"
        },
        {
            question: "ಬೆಂಗಳೂರಿನ ಅತ್ಯಂತ ಪುರಾತನ ಮತ್ತು ಪ್ರಸಿದ್ಧ ಉತ್ಸವಗಳಲ್ಲಿ ಒಂದಾದ ಬೆಂಗಳೂರು ಕರಗವು ಮುಖ್ಯವಾಗಿ ಯಾವ ಸಮುದಾಯದೊಂದಿಗೆ ಸಂಬಂಧಿಸಿದೆ?(The Bengaluru Karaga, one of the oldest and most celebrated festivals in Bengaluru Urban, is primarily associated with which community?)",
            options: ["ವೊಕ್ಕಲಿಗ(Vokkaliga)", "ತಿಗಳ(Thigala)", "ಕುರುಬ(Kuruba)", "ಲಿಂಗಾಯತ(Lingayat)"],
            answer: "ತಿಗಳ(Thigala)"
        },
        {
            question: "ಕೆಂಪೇಗೌಡ ಪ್ರಥಮರು ನಿರ್ಮಿಸಿದ್ದ ಐತಿಹಾಸಿಕ 'ಧರ್ಮಾಂಬುಧಿ ಕೆರೆ'ಯನ್ನು ಒಣಗಿಸಿ ನಂತರ ಬೆಂಗಳೂರಿನ ಯಾವ ಪ್ರಮುಖ ಸಾರಿಗೆ ಕೇಂದ್ರವಾಗಿ ಪರಿವರ್ತಿಸಲಾಯಿತು?(The historic 'Dharmambudhi Kere' (lake), built by Kempe Gowda I, was dried up and later transformed into which major transport hub in Bengaluru?)",

            options: [
                "ಕ್ರಾಂತಿವೀರ ಸಂಗೊಳ್ಳಿ ರಾಯಣ್ಣ ರೈಲು ನಿಲ್ದಾಣ (Krantivira Sangolli Rayanna Railway Station)",
                "ಶಾಂತಿನಗರ ಬಸ್ ನಿಲ್ದಾಣ (Shantinagar Bus Station)",
                "ಕೆಂಪೇಗೌಡ ಬಸ್ ನಿಲ್ದಾಣ (ಮೆಜೆಸ್ಟಿಕ್) (Kempegowda Bus Station (Majestic))",
                "ಯಶವಂತಪುರ ಜಂಕ್ಷನ್ (Yeshwantpur Junction)"
            ],

            answer: "ಕೆಂಪೇಗೌಡ ಬಸ್ ನಿಲ್ದಾಣ (ಮೆಜೆಸ್ಟಿಕ್) (Kempegowda Bus Station (Majestic))"
        },
        {
            question: "ಮದನಾಯಕನಹಳ್ಳಿ ಮತ್ತು ನೆಲಮಂಗಲದ ನಡುವೆ ಇರುವ ಯಾವ ಹೋಬಳಿ/ಕಂದಾಯ ವಲಯದ ವ್ಯಾಪ್ತಿಗೆ ಅಡಕಮಾರನಹಳ್ಳಿ ಗ್ರಾಮ ಬರುತ್ತದೆ?(Adakamaranahalli village falls under which Hobli/revenue circle located between Madanayakanahalli and Nelamangala?)",
            options: ["ಕಸಬಾ ಹೋಬಳಿ(Kasaba Hobli)", "ಬಿಡದಿ ಹೋಬಳಿ(Bidadi Hobli)", "ದಾಸನಪುರ ಹೋಬಳಿ(Dasanapura Hobli)", "ಸೋಂಪುರ ಹೋಬಳಿ(Sompura Hobli)"],
            answer: "ದಾಸನಪುರ ಹೋಬಳಿ(Dasanapura Hobli)"
        },
        {
            question: "ಕರ್ನಾಟಕದಲ್ಲಿ ಹಸಿ ರೇಷ್ಮೆ ಮತ್ತು ರೇಷ್ಮೆ ಗೂಡುಗಳ ಅತಿದೊಡ್ಡ ಉತ್ಪಾದನಾ ಕೇಂದ್ರಗಳು ಹಾಗೂ ಮಾರುಕಟ್ಟೆಗಳಲ್ಲಿ ಒಂದೆಂದು ಪ್ರಸಿದ್ಧವಾಗಿರುವ ಚಿಕ್ಕಬಳ್ಳಾಪುರ ಜಿಲ್ಲೆಯ ಪಟ್ಟಣ ಯಾವುದು?(Which town in Chikkaballapur district is renowned as one of the largest production centers and markets for raw silk and cocoons in Karnataka?)",
            options: ["ಶಿಡ್ಲಘಟ್ಟ(Sidlaghatta)", "ಗುಡಿಬಂಡೆ(Gudibanda)", "ಬಾಗೇಪಲ್ಲಿ(Bagepalli)", "ಗೌರಿಬಿದನೂರು(Gauribidanur)"],
            answer: "ಶಿಡ್ಲಘಟ್ಟ(Sidlaghatta)"
        },
        {
            question: "ಪ್ರಸಿದ್ಧ ಹೊಯ್ಸಳ ಶಿಲ್ಪಿ ಅಮರಶಿಲ್ಪಿ ಜಕಣಾಚಾರಿಯ ಜನ್ಮಸ್ಥಳವೆಂದು ಐತಿಹಾಸಿಕವಾಗಿ ಪ್ರಸಿದ್ಧವಾಗಿರುವ ತುಮಕೂರು ಜಿಲ್ಲೆಯ ಪಟ್ಟಣ ಯಾವುದು?(Which town in Tumakuru district is historically celebrated as the birthplace of the legendary Hoysala master sculptor Amarashilpi Jakanachari?)",
            options: [ "ಕುಣಿಗಲ್(Kunigal)", "ತಿಪಟೂರು(Tiptur)","ಕೈದಾಳ(Kaidala)", "ಕೊರಟಗೆರೆ(Koratagere)"],
            answer: "ಕೈದಾಳ(Kaidala)"
        },
        {
            question: "ಹೊಯ್ಸಳ ವಾಸ್ತುಶಿಲ್ಪದ ಅತ್ಯುತ್ತಮ ಉದಾಹರಣೆಗಳಾದ ಪ್ರಾಚೀನ ಚೆನ್ನಕೇಶವ ದೇವಾಲಯ ಮತ್ತು ಮೂಲೆ ಶಂಕರೇಶ್ವರ ದೇವಾಲಯಗಳು ತುಮಕೂರು ಜಿಲ್ಲೆಯ ಯಾವ ಪಟ್ಟಣದಲ್ಲಿ ನೆಲೆಗೊಂಡಿವೆ?(The ancient Chennakeshava Temple and Moole Shankareshwara Temple, fine examples of Hoysala architecture, are situated in which town of Tumakuru district?)",
            options: ["ತುರವೇಕೆರೆ(Turuvekere)", "ಚಿಕ್ಕನಾಯಕನಹಳ್ಳಿ(Chikkanayakanahalli)", "ಪಾವಗಡ(Pavagada)", "ಕೊರಟಗೆರೆ(Koratagere)"],
            answer: "ತುರವೇಕೆರೆ(Turuvekere)"
        },
        {
            question: "ನಮ್ಮ ಮೆಟ್ರೋದ ಹಸಿರು ಮಾರ್ಗದಲ್ಲಿರುವ ಯಾವ ಟರ್ಮಿನಲ್ ಮೆಟ್ರೋ ನಿಲ್ದಾಣವು BIECಗೆ ನೇರ ಸಂಪರ್ಕವನ್ನು ಒದಗಿಸುತ್ತದೆ?(Which terminal metro station on Namma Metro's Green Line directly connects visitors to BIEC?)",
            options: ["ನಾಗಸಂದ್ರ(Nagasandra)", "ದಾಸರಹಳ್ಳಿ(Dasarahalli)", "ಮಾದಾವರ(Madavara)", "ಜಾಲಹಳ್ಳಿ(Jalahalli)"],
            answer: "ಮಾದಾವರ(Madavara)"
        },

        {
            question: "ತುಮಕೂರು ಜಿಲ್ಲೆಯ ಪಾವಗಡ ತಾಲ್ಲೂಕಿನ ನಿಡಗಲ್ ಬೆಟ್ಟಕೋಟೆಯು ಕರಿಕಾಲ ಚೋಳನ ವಂಶಸ್ಥರೆಂದು ಹೇಳಿಕೊಂಡಿದ್ದ ಯಾವ ಸಾಮಂತ ರಾಜವಂಶದ ಕಾರ್ಯತಂತ್ರದ ಪ್ರಮುಖ ಕೋಟೆ ಮತ್ತು ರಾಜಧಾನಿಯಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸಿತು?(The hill fortress of Nidugal in Pavagada taluk of Tumakuru district served as the strategic stronghold and capital of which feudatory dynasty that claimed descent from Karikala Chola?)",
            options: ["ರೆಣಾಟಿ ಚೋಳರು(Renati Cholas)", "ಕುಂದೂರಿನ ತೆಲುಗು ಚೋಡರು(Telugu Chodas of Kundur)", "ಪೆರುಂಬನಪ್ಪಾಡಿಯ ಬಾಣರು(Banas of Perumbanappadi)", "ನಿಡಗಲ್ ಚೋಳರು(Nidugal Cholas)"],
            answer: "ನಿಡಗಲ್ ಚೋಳರು(Nidugal Cholas)"
        } ],

    2: [
         {
            question: "ಶಿವಮೊಗ್ಗದಲ್ಲಿರುವ ಯಾವ ಸ್ಥಳವು ಭಾರತದ ಸಂಸ್ಕೃತ ಗ್ರಾಮವೆಂದು ಪ್ರಸಿದ್ಧವಾಗಿದೆ?(Which place in Shivamogga is renowned as the Sanskrit village of India?)",
            options: ["ಮತ್ತೂರು(Mattur)", "ಕೆಳದಿ(Keladi)", "ಇಕ್ಕೇರಿ(Ikkeri)", "ಆಗುಂಬೆ(Agumbe)"],
            answer: "ಮತ್ತೂರು(Mattur)"
        },

        {
            question: "ಆಗುಂಬೆಯನ್ನು ಯಾವ ಸರೀಸೃಪ ಪ್ರಭೇದದ ರಾಜಧಾನಿ ಎಂದು ಪ್ರಸಿದ್ಧವಾಗಿ ಕರೆಯಲಾಗುತ್ತದೆ?(Agumbe is famously referred to as the capital of which reptile species?)",
            options: ["ಭಾರತೀಯ ಹೆಬ್ಬಾವು(Indian Python)", "ಕಾಳಿಂಗ ಸರ್ಪ(King Cobra)", "ರಸೆಲ್ಸ್ ವೈಪರ್(Russell's Viper)", "ಸಾ-ಸ್ಕೇಲ್ಡ್ ವೈಪರ್(Saw-scaled Viper)"],
            answer: "ಕಾಳಿಂಗ ಸರ್ಪ(King Cobra)"
        },

        {
            question: "ಐತಿಹಾಸಿಕ ಪಟ್ಟಣವಾದ ಇಕ್ಕೇರಿಯು ಯಾವ ರಾಜವಂಶದ ರಾಜಧಾನಿಯಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸಿತು?(The historical town of Ikkeri served as the capital for which dynasty?)",
            options: ["ಹೊಯ್ಸಳರು(Hoysalas)", "ಕೆಳದಿ ನಾಯಕರರು(Keladi Nayakas)", "ಕದಂಬರು(Kadambas)", "ಗಂಗರು(Gangas)"],
            answer: "ಕೆಳದಿ ನಾಯಕರರು(Keladi Nayakas)"
        },

        {
            question: "ಕವಿ ಕುವೆಂಪು ಅವರ ಸ್ಮಾರಕವಾದ ಕವಿಶೈಲವು ಯಾವ ಪಟ್ಟಣದಲ್ಲಿ ಇದೆ?(Kavishaila, the memorial of poet Kuvempu, is located in which town?)",
            options: ["ಸಾಗರ(Sagara)", "ಕುಪ್ಪಳ್ಳಿ(Kuppalli)", "ಸೊರಬ(Soraba)", "ಶಿಕಾರಿಪುರ(Shikaripura)"],
            answer: "ಕುಪ್ಪಳ್ಳಿ(Kuppalli)"
        },

        {
            question: "ಶರಾವತಿ ನದಿ ಜಲಾನಯನ ಪ್ರದೇಶದೊಳಗಿನ ದ್ವೀಪವೊಂದರ ಮೇಲೆ ನಿರ್ಮಿಸಲಾಗಿರುವ ಶಿವಮೊಗ್ಗ ಜಿಲ್ಲೆಯ ಯಾವ ಕೋಟೆ ಪ್ರಸಿದ್ಧವಾಗಿದೆ?(Which fort located in Shivamogga district is built on an island within the Sharavathi river basin?)",
            options: ["ಕವಲೇದುರ್ಗ ಕೋಟೆ(Kavaledurga Fort)", "ನಗರ ಕೋಟೆ(Nagara Fort)", "ಮಿರ್ಜಾನ್ ಕೋಟೆ(Mirjan Fort)", "ಕಾನೂರು ಕೋಟೆ(Kanoor Fort)"],
            answer: "ನಗರ ಕೋಟೆ(Nagara Fort)"
        },

        {
            question: "ರಾಶಿಚಕ್ರಕ್ಕೆ ಅನುಗುಣವಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ವಾಸ್ತುಶಿಲ್ಪದ ಕಂಬಗಳನ್ನು ಹೊಂದಿರುವ ವಿದ್ಯಾಶಂಕರ ದೇವಾಲಯವು ಯಾವ ಪಟ್ಟಣದಲ್ಲಿ ಇದೆ?(The Vidyashankara Temple, featuring zodiac-aligned architectural pillars, is located in which town?)",
            options: ["ಕೊಪ್ಪ(Koppa)", "ಶೃಂಗೇರಿ(Sringeri)", "ಮೂಡಿಗೆರೆ(Mudigere)", "ತರೀಕೆರೆ(Tarikere)"],
            answer: "ಶೃಂಗೇರಿ(Sringeri)"
        },

        {
            question: "ಕೆಮ್ಮಣ್ಣುಗುಂಡಿಯ ಸಮೀಪದಲ್ಲಿ ಎರಡು ವಿಭಿನ್ನ ಹಂತಗಳಲ್ಲಿ ಕೆಳಕ್ಕೆ ಧುಮುಕುವ ಯಾವ ಜಲಪಾತವಿದೆ?(Which waterfall near Kemmangundi drops down in two distinct stages?)",
            options: [ "ಕಲ್ಹಟ್ಟಿ ಜಲಪಾತ(Kalhatti Falls)","ಹೆಬ್ಬೆ ಜಲಪಾತ(Hebbe Falls)", "ಅಬ್ಬಿ ಜಲಪಾತ(Abbi Falls)", "ಉಂಚಳ್ಳಿ ಜಲಪಾತ(Unchalli Falls)"],
            answer: "ಹೆಬ್ಬೆ ಜಲಪಾತ(Hebbe Falls)"
        },

        {
            question: "ಮೈಸೂರು ಮಹಾರಾಜರಾದ ನಾಲ್ವಡಿ ಕೃಷ್ಣರಾಜ ಒಡೆಯರ್ ಅವರ ಬೇಸಿಗೆ ವಿಶ್ರಾಂತಿ ತಾಣವಾಗಿದ್ದ ಚಿಕ್ಕಮಗಳೂರಿನ ಯಾವ ಸುಂದರ ಗಿರಿಧಾಮ ಪ್ರಸಿದ್ಧವಾಗಿದೆ?(Which scenic hill station in Chikkamagaluru served as the summer retreat for the Maharaja of Mysore, Krishnaraja Wodeyar IV?)",
            options: ["ಕೆಮ್ಮಣ್ಣುಗುಂಡಿ(Kemmangundi)", "ಕುದುರೆಮುಖ(Kudremukh)", "ಚಾರ್ಮಾಡಿ(Charmadi)", "ಕುದ್ರೆಗುಂಡಿ(Kudregundi)"],
            answer: "ಕೆಮ್ಮಣ್ಣುಗುಂಡಿ(Kemmangundi)"
        },

        {
            question: "ಚಿಕ್ಕಮಗಳೂರಿನ ಯಾವ ಪರ್ವತ ಶ್ರೇಣಿಯಲ್ಲಿ ದತ್ತಾತ್ರೇಯ ಪೀಠದ ದೇವಾಲಯವಿದೆ?(The Dattatreya Peetha shrine is situated on which mountain range in Chikkamagaluru?)",
            options: ["ಹಿಮವದ್ ಗೋಪಾಲಸ್ವಾಮಿ ಬೆಟ್ಟ(Himavad Gopalaswamy Betta)", "ಬಾಬಾ ಬುಡನ್ ಗಿರಿ(Baba Budan Giri)", "ದೇವರಾಯನದುರ್ಗ(Devarayanadurga)", "ಬಿಳಿಗಿರಿರಂಗನ ಬೆಟ್ಟಗಳು(Biligirirangana Hills)"],
            answer: "ಬಾಬಾ ಬುಡನ್ ಗಿರಿ(Baba Budan Giri)"
        },

        {
            question: "ಕುದುರೆಮುಖ ಪರ್ವತ ಶ್ರೇಣಿಯ ಗಂಗಾಮೂಲದಲ್ಲಿ ಯಾವ ನದಿ ಹುಟ್ಟುತ್ತದೆ?(Which river originates at Gangamoola in the Kudremukh mountain range?)",
            options: ["ಶರಾವತಿ(Sharavathi)","ನೇತ್ರಾವತಿ(Netravati)", "ಹೇಮಾವತಿ(Hemavati)", "ಕಾವೇರಿ(Cauvery)"],
            answer: "ನೇತ್ರಾವತಿ(Netravati)"
        },

        {
            question: "ಶೆಟ್ಟಿಹಳ್ಳಿ ರೋಸರಿ ಚರ್ಚ್ ಮುಂಗಾರು ಮಳೆಯ ಸಮಯದಲ್ಲಿ ಯಾವ ಜಲಾಶಯದ ಹಿನ್ನೀರಿನಲ್ಲಿ ಮುಳುಗುವುದಕ್ಕೆ ಪ್ರಸಿದ್ಧವಾಗಿದೆ?(Shettihalli Rosary Church is famous for being submerged during monsoons by the backwaters of which reservoir?)",
            options: ["ಹಾರಂಗಿ ಅಣೆಕಟ್ಟು(Harangi Dam)", "ವಾಣಿ ವಿಲಾಸ ಸಾಗರ(Vani Vilasa Sagara)","ಗೋರೂರು ಅಣೆಕಟ್ಟು(Gorur Dam)", "ಲಿಂಗನಮಕ್ಕಿ ಅಣೆಕಟ್ಟು(Linganamakki Dam)"],
            answer: "ಗೋರೂರು ಅಣೆಕಟ್ಟು(Gorur Dam)"
        },

        {
            question: "ಬೆಳೂರು ಮತ್ತು ಹಳೇಬೀಡನ್ನು ತನ್ನ ಪ್ರಮುಖ ರಾಜಧಾನಿಗಳನ್ನಾಗಿ ಹೊಂದಿದ್ದ ಮಧ್ಯಕಾಲೀನ ದಕ್ಷಿಣ ಭಾರತದ ರಾಜವಂಶ ಯಾವುದು?(Which medieval South Indian dynasty had its primary capitals at Belur and Halebidu?)",
            options: ["ಹೊಯ್ಸಳರು(Hoysala)", "ಚಾಲುಕ್ಯರು(Chalukya)", "ರಾಷ್ಟ್ರಕೂಟರು(Rashtrakuta)", "ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯ(Vijayanagara)"],
            answer: "ಹೊಯ್ಸಳರು(Hoysala)"
        },

        {
            question: "ಸಕಲೇಶಪುರದ ಸಮೀಪದಲ್ಲಿರುವ ನಕ್ಷತ್ರಾಕಾರದ ಮಂಜರಾಬಾದ್ ಕೋಟೆಯನ್ನು ಯಾವ ಐತಿಹಾಸಿಕ ಅರಸನು ನಿರ್ಮಿಸಿದನು?(The star-shaped Manjarabad Fort near Sakleshpur was built by which historical ruler?)",
            options: ["ಹೈದರಲಿ(Hyder Ali)", "ಟಿಪ್ಪು ಸುಲ್ತಾನ್(Tipu Sultan)", "ಶಿವಪ್ಪ ನಾಯಕ(Shivappa Nayaka)", "ಚಿಕ್ಕ ದೇವರಾಜ ಒಡೆಯರ್(Chikka Devaraja Wodeyar)"],
            answer: "ಟಿಪ್ಪು ಸುಲ್ತಾನ್(Tipu Sultan)"
        },

        {
            question: "ಹಾಸನದ ಮೂಲಕ ಹರಿದು ಗೋರೂರು ಜಲಾಶಯಕ್ಕೆ ನೀರು ಒದಗಿಸುವ ಪ್ರಮುಖ ನದಿ ಯಾವುದು?(Which major river flows through Hassan and feeds the Gorur Reservoir?)",
            options: ["ತುಂಗಾ(Tunga)", "ಹೇಮಾವತಿ(Hemavati)", "ಕಬಿನಿ(Kabini)", "ನೇತ್ರಾವತಿ(Netravati)"],
            answer: "ಹೇಮಾವತಿ(Hemavati)"
        },

        {
            question: "ಶ್ರವಣಬೆಳಗೊಳದಲ್ಲಿರುವ ಏಕಶಿಲಾ ಗೊಮ್ಮಟೇಶ್ವರ ಪ್ರತಿಮೆಯು ಯಾವ ಜೈನ ತೀರ್ಥಂಕರನನ್ನು ಪ್ರತಿನಿಧಿಸುತ್ತದೆ?(The monolithic Gommateshwara statue at Shravanabelagola depicts which Jain Tirthankara?)",
            options: ["ಋಷಭನಾಥ(Rishabhanatha)", "ಪಾರ್ಶ್ವನಾಥ(Parshvanatha)", "ಬಾಹುಬಲಿ(Bahubali)", "ಮಹಾವೀರ(Mahavira)"],
            answer: "ಬಾಹುಬಲಿ(Bahubali)"
        },

        {
            question: "ಬ್ರಹ್ಮಗಿರಿ ಬೆಟ್ಟಗಳಲ್ಲಿ ಕಾವೇರಿ ನದಿಯ ಉಗಮಸ್ಥಳವೆಂದು ಪ್ರಸಿದ್ಧವಾಗಿರುವ ಪವಿತ್ರ ಸ್ಥಳ ಯಾವುದು?(Which sacred spot in the Brahmagiri Hills is celebrated as the origin of the river Cauvery?)",
            options: [ "ಭಾಗಮಂಡಲ(Bhagamandala)", "ಕಾವೇರಿಪಟ್ಟಣ(Kaveripattinam)","ತಲಕಾವೇರಿ(Talakaveri)", "ತಿರುಮಕೂಡಲು(Tirumakudalu)"],
            answer: "ತಲಕಾವೇರಿ(Talakaveri)"
        },

        {
            question: "ಕೊಡಗಿನ ದುಬಾರೆ ಯಾವ ಪ್ರಾಣಿಯ ಸಂರಕ್ಷಣೆ ಮತ್ತು ತರಬೇತಿ ಶಿಬಿರಕ್ಕಾಗಿ ಮುಖ್ಯವಾಗಿ ಪ್ರಸಿದ್ಧವಾಗಿದೆ?(Dubare in Kodagu is primarily famous for its conservation and training camp for which animal?)",
            options: ["ಆನೆಗಳು(Elephants)", "ಹುಲಿಗಳು(Tigers)", "ಕಾಡೆಮ್ಮೆಗಳು(Gaurs)", "ಸೋಮಾರಿ ಕರಡಿಗಳು(Sloth Bears)"],
            answer: "ಆನೆಗಳು(Elephants)"
        },

        {
            question: "ದಕ್ಷಿಣ ಕೊಡಗಿನ ಇರ್ಪು ಜಲಪಾತವು ಕಾವೇರಿ ನದಿಯ ಯಾವ ಉಪನದಿಯಿಂದ ರೂಪುಗೊಂಡಿದೆ?(Iruppu Falls in South Kodagu is formed by which tributary of the Cauvery?)",
            options: ["ಹೇಮಾವತಿ(Hemavati)","ಲಕ್ಷ್ಮಣ ತೀರ್ಥ(Lakshmana Tirtha)", "ಹಾರಂಗಿ(Harangi)", "ಶಿಂಷಾ(Shimsha)"],
            answer: "ಲಕ್ಷ್ಮಣ ತೀರ್ಥ(Lakshmana Tirtha)"
        },

        {
            question: "ಕೊಡಗಿನಲ್ಲಿ ಪ್ರಸಿದ್ಧ ಟಿಬೆಟಿಯನ್ ಬೌದ್ಧ ವಸಾಹತು ಮತ್ತು ಗೋಲ್ಡನ್ ಟೆಂಪಲ್ ಎಲ್ಲಿದೆ?(Which famous Tibetan Buddhist settlement and Golden Temple is located in Kodagu?)",
            options: ["ಧರ್ಮಶಾಲಾ(Dharamshala)", "ಮುಂಡಗೋಡ(Mundgod)","ಬೈಲಕುಪ್ಪೆ(Bylakuppe)", "ತವಾಂಗ್(Tawang)"],
            answer: "ಬೈಲಕುಪ್ಪೆ(Bylakuppe)"
        },

        {
            question: "ಕೊಡವ ಸಮುದಾಯವು ಆಚರಿಸುವ ಯಾವ ಹಬ್ಬವು ಆಯುಧಗಳು ಮತ್ತು ಕೃಷಿ ಉಪಕರಣಗಳ ಪೂಜೆಯನ್ನು ಸೂಚಿಸುತ್ತದೆ?(Which festival celebrated by the Kodava community marks the worship of weapons and harvest tools?)",
            options: ["ಕೈಲ್ಪೊಡ್ದ್(Kailpodhd)", "ಪುಟ್ಟಾರಿ(Puttari)", "ಕಾವೇರಿ ಸಂಕ್ರಮಣ(Kaveri Sankramana)", "ಬಿಸು ಪರ್ಬ(Bisu Parba)"],
            answer: "ಕೈಲ್ಪೊಡ್ದ್(Kailpodhd)"
        }


    ],
    3: [
        {
            question:
                "ಟಿಪ್ಪು ಸುಲ್ತಾನ್ ಮತ್ತು ಬ್ರಿಟಿಷ್ ಈಸ್ಟ್ ಇಂಡಿಯಾ ಕಂಪನಿಯ ನಡುವೆ ಮಂಗಳೂರು ಒಪ್ಪಂದವು ಯಾವ ವರ್ಷದಲ್ಲಿ ಸಹಿ ಆಯಿತು?(In which year was the Treaty of Mangalore signed between Tipu Sultan and the British East India Company?)",
            options: ["1786", "1784", "1767", "1792"],
            answer: "1784"
        },

        {
            question:
                "ಕಟೀಲಿನ ಪ್ರಸಿದ್ಧ ಶ್ರೀ ದುರ್ಗಾಪರಮೇಶ್ವರಿ ದೇವಾಲಯವು ಯಾವ ನದಿಯ ಮಧ್ಯಭಾಗದ ದ್ವೀಪದಲ್ಲಿದೆ?(The famous Shri Durgaparameshwari Temple in Kateel is situated on an islet within which river?)",
            options: [
                "ನೇತ್ರಾವತಿ(Netravati)",
                "ನಂದಿನಿ(Nandini)",
                "ಕುಮಾರಧಾರ(Kumaradhara)",
                "ಶಾಂಭವಿ(Shambhavi)"
            ],
            answer: "ನಂದಿನಿ(Nandini)"
        },

        {
            question:
                "ದಕ್ಷಿಣ ಕನ್ನಡದ ಯಾವ ಪವಿತ್ರ ಕ್ಷೇತ್ರವು 'ಸರ್ಪ ಸಂಸ್ಕಾರ' ಮತ್ತು 'ಆಶ್ಲೇಷ ಬಲಿ' ಪೂಜೆಗಳಿಗೆ ಪ್ರಸಿದ್ಧವಾಗಿದೆ?(Which sacred temple in Dakshina Kannada is famous for 'Sarpa Samskara' and 'Ashlesha Bali' rituals?)",
            options: [
                "ಧರ್ಮಸ್ಥಳ ಮಂಜುನಾಥ(Dharmasthala Manjunatha)",
                "ಕುಕ್ಕೆ ಸುಬ್ರಹ್ಮಣ್ಯ(Kukke Subramanya)",
                "ಕಟೀಲು ದುರ್ಗಾಪರಮೇಶ್ವರಿ(Kateel Durgaparameshwari)",
                "ಪೊಳಲಿ ರಾಜರಾಜೇಶ್ವರಿ(Polali Rajarajeshwari)"
            ],
            answer: "ಕುಕ್ಕೆ ಸುಬ್ರಹ್ಮಣ್ಯ(Kukke Subramanya)"
        },

        {
            question:
                "ಉಳ್ಳಾಲವನ್ನು ರಾಜಧಾನಿಯನ್ನಾಗಿ ಮಾಡಿಕೊಂಡು ರಾಣಿ ಅಬ್ಬಕ್ಕ ಆಳಿದ ಪ್ರಾಚೀನ ರಾಜವಂಶ ಯಾವುದು?(Which ancient dynasty ruled coastal Karnataka with its capital at Ullal and was led by Queen Abbakka Chowta?)",
            options: [
                "ಅಳಿಯ ಸಂತಾನ ರಾಜವಂಶ(Aliya Santana Dynasty)",
                "ಆಳುಪ ರಾಜವಂಶ(Alupa Dynasty)",
                "ಕದಂಬ ರಾಜವಂಶ(Kadamba Dynasty)",
                "ಚೌಟ ರಾಜವಂಶ(Chowta Dynasty)"
            ],
            answer: "ಚೌಟ ರಾಜವಂಶ(Chowta Dynasty)"
        },

        {
            question:
                "ನೇತ್ರಾವತಿ ಮತ್ತು ಗುರುಪುರ ನದಿಗಳು ಸಮುದ್ರ ಸೇರುವ ಸಂಗಮ ಸ್ಥಳದಲ್ಲಿ ಮಂಗಳೂರಿನ ಯಾವ ಸುಂದರ ಕಡಲತೀರವಿದೆ?(Which scenic beach in Mangaluru is situated right at the confluence of the Netravati and Gurupura rivers?)",
            options: [
                "ಪಣಂಬೂರು ಬೀಚ್(Panambur Beach)",
                "ಉಳ್ಳಾಲ ಬೀಚ್(Ullal Beach)",
                "ತಣ್ಣೀರುಬಾವಿ ಬೀಚ್(Tannirbhavi Beach)",
                "ಸೋಮೇಶ್ವರ ಬೀಚ್(Someshwara Beach)"
            ],
            answer: "ತಣ್ಣೀರುಬಾವಿ ಬೀಚ್(Tannirbhavi Beach)"
        },

        {
            question:
                "ದಕ್ಷಿಣ ಕನ್ನಡದ ಗ್ರಾಮೀಣ ಗದ್ದೆಗಳಲ್ಲಿ ನಡೆಯುವ ಸಾಂಪ್ರದಾಯಿಕ ಕೋಣಗಳ ಓಟದ ಸ್ಪರ್ಧೆಯನ್ನು ಏನೆಂದು ಕರೆಯುತ್ತಾರೆ?(The traditional buffalo race native to the rural marshlands of Dakshina Kannada is called what?)",
            options: [
                "ಕಂಬಳ(Kambala)",
                "ಜಲ್ಲಿಕಟ್ಟು(Jallikattu)",
                "ಬಂಡಿ ಓಟ(Bail Gadi Shart)",
                "ಕೋಳಿ ಕಟ್ಟ(Kori Katta)"
            ],
            answer: "ಕಂಬಳ(Kambala)"
        },

        {
            question:
                "ಅವಿಭಜಿತ ದಕ್ಷಿಣ ಕನ್ನಡ ಜಿಲ್ಲೆಯನ್ನು ವಿಭಜಿಸಿ ಉಡುಪಿ ಜಿಲ್ಲೆಯನ್ನು ಯಾವ ವರ್ಷದಲ್ಲಿ ರಚಿಸಲಾಯಿತು?(In which year was the composite South Canara district bifurcated to carve out the Udupi district?)",
            options: ["1995", "1997", "1999", "2001"],
            answer: "1997"
        },

        {
            question:
                "ಮೂಡುಬಿದಿರೆ ಪಟ್ಟಣವು ತನ್ನ ಅನೇಕ ಜೈನ ಬಸದಿಗಳಿಂದಾಗಿ ಯಾವ ಐತಿಹಾಸಿಕ ಹೆಸರಿನಿಂದ ಜನಪ್ರಿಯವಾಗಿದೆ?(The town of Moodabidri is widely known by which historical epithet due to its numerous Jain shrines?)",
            options: [
                "ದಕ್ಷಿಣ ಕಾಶಿ(Dakshina Kashi)",
                "ದೇವಾಲಯಗಳ ನಗರಿ(Temple City)",
                "ಜೈನಕಾಶಿ(Jainakashi)",
                "ದಕ್ಷಿಣದ ವಾರಣಾಸಿ(Varanasi of South)"
            ],
            answer: "ಜೈನಕಾಶಿ(Jainakashi)"
        },

        {
            question:
                "ಕುಂದಾಪುರ ಪಟ್ಟಣದ ಹೆಸರಿಗೆ ಮೂಲ ಕಾರಣವೆಂದು ನಂಬಲಾದ ಐತಿಹಾಸಿಕ ದೇವಾಲಯ ಯಾವುದು?(Which historical temple is believed to have given Kundapura its name?)",
            options: [
                "ಶ್ರೀ ಮೂಕಾಂಬಿಕಾ ದೇವಾಲಯ(Sri Mookambika Temple)",
                "ಶ್ರೀ ಕುಂದೇಶ್ವರ ದೇವಾಲಯ(Sri Kundeshwara Temple)",
                "ಆನೆಗುಡ್ಡೆ ವಿನಾಯಕ ದೇವಾಲಯ(Anegudde Vinayaka Temple)",
                "ಕೋಟೇಶ್ವರ ಕೋಟಿಲಿಂಗೇಶ್ವರ ದೇವಾಲಯ(Koteshwara Kotilingeshwara Temple)"
            ],
            answer: "ಶ್ರೀ ಕುಂದೇಶ್ವರ ದೇವಾಲಯ(Sri Kundeshwara Temple)"
        },

        {
            question:
                "ಒಂದು ಬದಿಯಲ್ಲಿ ಅರಬ್ಬಿ ಸಮುದ್ರ ಮತ್ತು ಇನ್ನೊಂದು ಬದಿಯಲ್ಲಿ ಸೌಪರ್ಣಿಕಾ ನದಿಯನ್ನು ಹೊಂದಿರುವ ಕುಂದಾಪುರದ ಬಳಿಯ ವಿಶಿಷ್ಟ ಕಡಲತೀರ ಯಾವುದು?(Which unique beach near Kundapura has the Arabian Sea on one side and the Souparnika River on the other?)",
            options: [

                "ತ್ರಾಸಿ ಬೀಚ್(Trasi Beach)",
                "ಕೋಡಿ ಬೀಚ್(Kodi Beach)",
                "ಮರವಂತೆ ಬೀಚ್(Maravanthe Beach)",
                "ಒಟ್ಟಿನೆಣೆ ಬೀಚ್(Ottinene Beach)"
            ],
            answer: "ಮರವಂತೆ ಬೀಚ್(Maravanthe Beach)"
        },

        {
            question:
                "ಕುಂದಾಪುರದ ಸಮೀಪವಿರುವ ಕೋಟೇಶ್ವರದ ಕೋಟಿಲಿಂಗೇಶ್ವರ ದೇವಾಲಯದಲ್ಲಿ ನಡೆಯುವ ಪ್ರಸಿದ್ಧ ವಾರ್ಷಿಕ ರಥೋತ್ಸವ ಯಾವುದು?(What is the name of the famous annual chariot festival celebrated at the Kotilingeshwara Temple in Koteshwara near Kundapura?)",
            options: [
                "ಮಕರ ಸಂಕ್ರಾಂತಿ ಜಾತ್ರೆ(Makara Sankranti Jathre)",
                "ಧನುರ್ಮಾಸ ಪೂಜೆ(Dhanurmasa Pooja)",
                "ಲಕ್ಷದೀಪೋತ್ಸವ(Lakshadweepotsava)",
                "ಕೋಡಿ ಹಬ್ಬ(Kodi Habba)"
            ],
            answer: "ಕೋಡಿ ಹಬ್ಬ(Kodi Habba)"
        },

        {
            question:
                "ಕುಂದಾಪುರ ಮತ್ತು ಬೈಂದೂರು ಭಾಗದಲ್ಲಿ ಅರಬ್ಬಿ ಸಮುದ್ರವನ್ನು ಸೇರುವ ಪವಿತ್ರ ನದಿ ಯಾವುದು?(Which sacred river flowing from the Kodachadri hills meets the Arabian Sea near Kundapura-Byndoor?)",
            options: [
                "ಸೌಪರ್ಣಿಕಾ ನದಿ(Souparnika River)",
                "ಕುಮಾರಧಾರ ನದಿ(Kumaradhara River)",
                "ಗುರುಪುರ ನದಿ(Gurupura River)",
                "ನಂದಿನಿ ನದಿ(Nandini River)"
            ],
            answer: "ಸೌಪರ್ಣಿಕಾ ನದಿ(Souparnika River)"
        },

        {
            question:
                "ಕುಂದಾಪುರ ಪ್ರದೇಶದಲ್ಲಿ ಉಗಮಗೊಂಡ, ಪ್ರಪಂಚದಾದ್ಯಂತ ಜನಪ್ರಿಯವಾಗಿರುವ ವಿಶಿಷ್ಟ ನಾನ್-ವೆಜ್ ಖಾದ್ಯ ಯಾವುದು?(Which iconic spicy dish originated in the Kundapura region and became globally famous?)",
            options: [
                "ಕೋರಿ ರೊಟ್ಟಿ(Kori Rotti)",
                "ಮಂಗಳೂರು ಬನ್ಸ್(Mangalore Buns)",
                "ಕುಂದಾಪುರ ಚಿಕನ್ ರೋಸ್ಟ್(Kundapura Chicken Ghee Roast)",
                "ಮೀನು ಗಸಿ(Fish Gassi)"
            ],
            answer: "ಕುಂದಾಪುರ ಚಿಕನ್ ರೋಸ್ಟ್(Kundapura Chicken Ghee Roast)"
        },

        {
            question:
                "ಉಡುಪಿಯ ಶ್ರೀ ಕೃಷ್ಣ ಮಠವನ್ನು 13ನೇ ಶತಮಾನದಲ್ಲಿ ಸ್ಥಾಪಿಸಿದ ದ್ವೈತ ತತ್ತ್ವಜ್ಞಾನಿ ಯಾರು?(Which Dvaita philosopher established the famous Sri Krishna Matha of Udupi in the 13th century?)",
            options: [
                "ಶ್ರೀ ಶಂಕರಾಚಾರ್ಯರು(Sri Shankaracharya)",
                "ಶ್ರೀ ರಾಮಾನುಜಾಚಾರ್ಯರು(Sri Ramanujacharya)",
                "ಶ್ರೀ ಮಧ್ವಾಚಾರ್ಯರು(Sri Madhvacharya)",
                "ಶ್ರೀ ವಾದಿರಾಜರು(Sri Vadiraja)"
            ],
            answer: "ಶ್ರೀ ಮಧ್ವಾಚಾರ್ಯರು(Sri Madhvacharya)"
        },

        {
            question:
                "ಕಾರ್ಕಳದಲ್ಲಿರುವ ಪ್ರಸಿದ್ಧ 'ಕೋಟಿ ಚೆನ್ನಯ ಥೀಮ್ ಪಾರ್ಕ್' ಅನ್ನು ಯಾವ ವರ್ಷದಲ್ಲಿ ಉದ್ಘಾಟಿಸಲಾಯಿತು?(In which year was the famous 'Koti Chennaya Theme Park' in Karkala inaugurated?)",
            options: ["2008", "2012", "2015", "2018"],
            answer: "2012"
        },

        {
            question:
                "ಉಡುಪಿ ಜಿಲ್ಲೆಯ ಕುಂದಾಪುರ ಭಾಗದಲ್ಲಿ ಮಾತನಾಡುವ ವಿಶಿಷ್ಟ ಕನ್ನಡ ಪ್ರಭೇದವನ್ನು ಏನೆಂದು ಕರೆಯುತ್ತಾರೆ?(What is the distinctive dialect of Kannada spoken widely in the Kundapura region commonly called?)",
            options: [
                "ಅರೆಭಾಷೆ(Arebhashe)",
                "ಕುಂದಗನ್ನಡ(Kunda Kannada)",
                "ಹವ್ಯಕ ಕನ್ನಡ(Havyaka Kannada)",
                "ಧಾರವಾಡಿ ಕನ್ನಡ(Dharwad Kannada)"
            ],
            answer: "ಕುಂದಗನ್ನಡ(Kunda Kannada)"
        },

        {
            question:
                "ಉತ್ತರ ಕನ್ನಡ ಜಿಲ್ಲೆಯ ಕಾಳಿ ನದಿ ತೀರದಲ್ಲಿರುವ ಕೈಗಾ ಅಣು ವಿದ್ಯುತ್ ಸ್ಥಾವರದ ಮೊದಲ ಘಟಕವು ಯಾವ ವರ್ಷದಲ್ಲಿ ವಾಣಿಜ್ಯ ಕಾರ್ಯಾಚರಣೆ ಆರಂಭಿಸಿತು?(In which year did the first unit of the Kaiga Atomic Power Station begin commercial operation?)",
            options: ["1995", "2000", "2004", "2008"],
            answer: "2000"
        },

        {
            question:
                "ಗೋಕರ್ಣದ ಪ್ರಸಿದ್ಧ ಮಹಾಬಲೇಶ್ವರ ದೇವಾಲಯದಲ್ಲಿರುವ ಆತ್ಮಲಿಂಗವು ಯಾವ ಆಕಾರದಲ್ಲಿದೆ?(What shape is the sacred Atmalinga enshrined in the famous Mahabaleshwara Temple at Gokarna?)",
            options: [
                "ಗೋವಿನ ಕಿವಿಯ ಆಕಾರ / ಗೋಕರ್ಣ(Cow's Ear Shape)",
                "ಅಂಡಾಕಾರ(Oval Shape)",
                "ತ್ರಿಕೋನಾಕಾರ(Triangular Shape)",
                "ಚತುರ್ಭುಜಾಕಾರ(Square Shape)"
            ],
            answer: "ಗೋವಿನ ಕಿವಿಯ ಆಕಾರ / ಗೋಕರ್ಣ(Cow's Ear Shape)"
        },

        {
            question:
                "ಉತ್ತರ ಕನ್ನಡ ಜಿಲ್ಲೆಯ ಅಘನಾಶಿನಿ ನದಿಯು ಅರಬ್ಬಿ ಸಮುದ್ರವನ್ನು ಸೇರುವ ಮುಖಜ ಭೂಮಿಯಲ್ಲಿರುವ ಐತಿಹಾಸಿಕ ಕೋಟೆ ಯಾವುದು?(Which historical fort is situated on the banks of the Aghanashini River estuary in Uttara Kannada?)",
            options: [
                "ಮಿರ್ಜಾನ್ ಕೋಟೆ(Mirjan Fort)",
                "ಸದಾಶಿವಗಡ ಕೋಟೆ(Sadashivgad Fort)",
                "ಬಸವರಾಜ ದುರ್ಗ(Basavaraja Durga)",
                "ಕವಲೇದುರ್ಗ(Kavaledurga)"
            ],
            answer: "ಮಿರ್ಜಾನ್ ಕೋಟೆ(Mirjan Fort)"
        },

        {
            question:
                "ದಾಂಡೇಲಿ ವನ್ಯಜೀವಿ ಅಭಯಾರಣ್ಯವನ್ನು ಅಧಿಕೃತವಾಗಿ ವನ್ಯಜೀವಿ ಧಾಮವೆಂದು ಯಾವ ವರ್ಷದಲ್ಲಿ ಘೋಷಿಸಲಾಯಿತು?(In which year was the Dandeli Wildlife Sanctuary officially declared a wildlife sanctuary?)",
            options: ["1958", "1956", "1987", "1998"],
            answer: "1956"
        }
    ],

        4: [
            {
                question: "ಕರ್ನಾಟಕದ ಅತ್ಯಂತ ಹಳೆಯ ಅಣೆಕಟ್ಟುಗಳಲ್ಲಿ ಒಂದಾದ ಚಿತ್ರದುರ್ಗದ ವಾಣಿ ವಿಲಾಸ ಸಾಗರವನ್ನು ಯಾವ ನದಿಗೆ ಅಡ್ಡಲಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ?(Across which river is the historic Vani Vilasa Sagara / Mari Kanive dam built in Chitradurga?)",
                options: [
                    "ತುಂಗಭದ್ರಾ ನದಿ(Tungabhadra River)",
                    "ವೇದಾವತಿ ನದಿ(Vedavathi River)",
                    "ಘಟಪ್ರಭಾ ನದಿ(Ghataprabha River)",
                    "ಶರಾವತಿ ನದಿ(Sharavathi River)"
                ],
                answer: "ವೇದಾವತಿ ನದಿ(Vedavathi River)"
            },

            {
                question: "ದಾವಣಗೆರೆ ಜಿಲ್ಲೆಯಲ್ಲಿರುವ, ಏಷ್ಯಾದ ಎರಡನೇ ಅತಿ ದೊಡ್ಡ ಮಾನವ ನಿರ್ಮಿತ ನೀರಾವರಿ ಕೆರೆ ಯಾವುದು?(Which lake located in Davanagere district is considered the second largest human-made irrigation tank in Asia?)",
                options: [
                    "ಕಾರಂಜಿ ಕೆರೆ(Karanji Lake)",
                    "ಅಯ್ಯನಕೆರೆ(Ayyankere)",
                    "ಶಾಂತಿಸಾಗರ / ಸೂಳೆಕೆರೆ(Shanti Sagara / Sulekere)",
                    "ಕುಕ್ಕರಹಳ್ಳಿ ಕೆರೆ(Kukkarahalli Lake)"
                ],
                answer: "ಶಾಂತಿಸಾಗರ / ಸೂಳೆಕೆರೆ(Shanti Sagara / Sulekere)"
            },

            {
                question: "ಹಾವೇರಿ ಜಿಲ್ಲೆಯ ಕಾಗಿನೆಲೆಯು ಯಾವ ಪ್ರಸಿದ್ಧ ಭಕ್ತಿ ಪಂಥದ ಸಂತ-ಕವಿಯ ಐಕ್ಯ ಸ್ಥಳವಾಗಿದೆ?(Which famous Bhakti saint-poet has his sacred memorial/samadhi in Kaginele of Haveri district?)",
                options: [
                    "ಪುರಂದರದಾಸರು(Purandaradasa)",
                    "ಸರ್ವಜ್ಞ(Sarvajna)",
                    "ಶಿಶುನಾಳ ಶರೀಫರು(Shishunala Sharifa)",
                    "ಕನಕದಾಸರು(Kanakadasa)"
                ],
                answer: "ಕನಕದಾಸರು(Kanakadasa)"
            },

            {
                question: "ಬಳ್ಳಾರಿ ಜಿಲ್ಲೆಯಿಂದ ಬೇರ್ಪಟ್ಟು ವಿಜಯನಗರವು ಕರ್ನಾಟಕದ 31ನೇ ಜಿಲ್ಲೆಯಾಗಿ ಯಾವ ವರ್ಷದಲ್ಲಿ ಅಧಿಕೃತವಾಗಿ ರಚನೆಯಾಯಿತು?(In which year was Vijayanagara officially carved out of Ballari to become the 31st district of Karnataka?)",
                options: ["2019", "2020", "2021", "2022"],
                answer: "2021"
            },

            {
                question: "ಕರಡಿಗಳ ಸಂರಕ್ಷಣೆಗಾಗಿ ಪ್ರತ್ಯೇಕವಾಗಿ ಸ್ಥಾಪಿಸಲಾದ ಏಷ್ಯಾದ ಮೊದಲ ಕರಡಿ ಧಾಮವಾದ ದರೋಜಿ ಕರಡಿ ಅಭಯಾರಣ್ಯವು ಬಳ್ಳಾರಿಯ ಯಾವ ತಾಲೂಕಿನಲ್ಲಿದೆ?(In which taluk of Ballari district is Asia's first dedicated sloth bear sanctuary, Daroji Sanctuary, situated?)",
                options: [
                    "ಸಿರುಗುಪ್ಪ(Siruguppa)",
                    "ಸಂಡೂರು(Sandur)",
                    "ಕುರುಗೋಡು(Kurugodu)",
                    "ಕಂಪ್ಲಿ(Kampli)"
                ],
                answer: "ಸಂಡೂರು(Sandur)"
            },

            {
                question: "ಕೊಪ್ಪಳ ಜಿಲ್ಲೆಯ ಯಾವ ಪಟ್ಟಣವು ಸಾಂಪ್ರದಾಯಿಕ ಕೈಯಿಂದ ಮಾಡಿದ ಮರದ ಆಟಿಕೆಗಳು ಮತ್ತು ಕರಕುಶಲ ಕಲೆಗೆ ಜಿಐ (GI) ಟ್ಯಾಗ್ ಪಡೆದಿದೆ?(Which town in Koppala district is famous for its GI-tagged traditional handcrafted wooden toys?)",
                options: [

                    "ಕುಕನೂರು(Kukanur)",
                    "ಯಲಬುರ್ಗಾ(Yelburga)",
                    "ಕಿನ್ನಾಳ(Kinnal)",
                    "ಗಂಗಾವತಿ(Gangavathi)"
                ],
                answer: "ಕಿನ್ನಾಳ(Kinnal)"
            },

            {
                question: "ಗದಗ ಜಿಲ್ಲೆಯ ಲಕ್ಕುಂಡಿ ಗ್ರಾಮದಲ್ಲಿರುವ ಮೆಟ್ಟಿಲು ಬಾವಿ (Stepwell) ವಾಸ್ತುಶಿಲ್ಪಕ್ಕೆ ಹೆಸರಾದ ಪ್ರಸಿದ್ಧ ಕಲ್ಯಾಣಿ ಯಾವುದು?(Which famous stepped well/tank in Lakkundi village of Gadag district is celebrated for its exquisite Chalukyan stepwell architecture?)",
                options: [
                    "ಶಾಂತಿಸಾಗರ ಕಲ್ಯಾಣಿ(Shanti Sagara Kalyani)",
                    "ಮಾಣಿಕೇಶ್ವರ ಮುಸುಕಿನ ಬಾವಿ(Manikeshwara Musukina Bavi)",
                    "ಕೋಟೆ ಕಲ್ಯಾಣಿ(Kote Kalyani)",
                    "ಹೊಯ್ಸಳೇಶ್ವರ ಪುಷ್ಕರಣಿ(Hoysaleshwara Pushkarani)"
                ],
                answer: "ಮಾಣಿಕೇಶ್ವರ ಮುಸುಕಿನ ಬಾವಿ(Manikeshwara Musukina Bavi)"
            },

            {
                question: "ರಾಯಚೂರು ಜಿಲ್ಲೆಯ ಮಂತ್ರಾಲಯದ ಸಮೀಪ ತುಂಗಭದ್ರಾ ನದಿಯ ದಡದಲ್ಲಿ ಸಜೀವ ವೃಂದಾವನ ಪ್ರವೇಶಿಸಿದ ದ್ವೈತ ಸಂತ ಯಾರು?(Which Dvaita saint entered Jeeva Samadhi / Moola Brindavana on the banks of the Tungabhadra at Mantralayam near Raichur?)",
                options: [
                    "ಶ್ರೀ ವಾದಿರಾಜ ತೀರ್ಥರು(Sri Vadiraja Tirtha)",
                    "ಶ್ರೀ ವಿಜಯದಾಸರು(Sri Vijayadasa)",
                    "ಶ್ರೀ ಜಯತೀರ್ಥರು(Sri Jayatirtha)",
                    "ಶ್ರೀ ರಾಘವೇಂದ್ರ ಸ್ವಾಮಿಗಳು(Sri Raghavendra Swamy)"
                ],
                answer: "ಶ್ರೀ ರಾಘವೇಂದ್ರ ಸ್ವಾಮಿಗಳು(Sri Raghavendra Swamy)"
            },

            {
                question: "1857-58 ರ ಬ್ರಿಟಿಷರ ವಿರುದ್ಧದ ಸಶಸ್ತ್ರ ದಂಗೆಯಲ್ಲಿ ಶಹಾಪುರ-ಸುರಪುರ ಸಂಸ್ಥಾನವನ್ನು ಮುನ್ನಡೆಸಿದ ಯಾದಗಿರಿ ಪ್ರದೇಶದ ಪ್ರಸಿದ್ಧ ನಾಯಕ ಯಾರು?(Who was the famous chieftain of the Surpur principality in Yadgir who rebelled against the British during the 1857-58 uprising?)",
                options: [
                    "ಸರ್ಜಾ ಮುದ್ದಪ್ಪ ನಾಯಕ(Sarja Muddappa Nayaka)",
                    "ವೀರ ಸಿಂಧೂರ ಲಕ್ಷ್ಮಣ(Veera Sindhura Lakshmana)",
                    "ರಾಜಾ ವೆಂಕಟಪ್ಪ ನಾಯಕ(Raja Venkatappa Nayaka)",
                    "ಸಂಗೊಳ್ಳಿ ರಾಯಣ್ಣ(Sangolli Rayanna)"
                ],
                answer: "ರಾಜಾ ವೆಂಕಟಪ್ಪ ನಾಯಕ(Raja Venkatappa Nayaka)"
            },

            {
                question: "ಕಲಬುರಗಿ ಜಿಲ್ಲೆಯ ಗಾಣಗಾಪುರವು ದತ್ತಾತ್ರೇಯರ ಅವತಾರವೆಂದು ಪೂಜಿಸಲ್ಪಡುವ ಯಾವ ಪ್ರಸಿದ್ಧ ಗುರುವಿನ ಪವಿತ್ರ ನಿರ್ಗುಣ ಪಾದುಕೆಯ ತಾಣವಾಗಿದೆ?(Ganagapura in Kalaburagi district is famous for the sacred Nirguna Padukas of which saint revered as an incarnation of Lord Dattatreya?)",
                options: [
                    "ಶ್ರೀ ನರಸಿಂಹ ಸರಸ್ವತಿ ಸ್ವಾಮಿ(Sri Narasimha Saraswati Swamy)",
                    "ಶ್ರೀ ಶಿರಡಿ ಸಾಯಿಬಾಬಾ(Sri Shirdi Saibaba)",
                    "ಶ್ರೀ ರಾಘವೇಂದ್ರ ಸ್ವಾಮಿ(Sri Raghavendra Swamy)",
                    "ಶ್ರೀ ವಿದ್ಯಾರಣ್ಯರು(Sri Vidyaranya)"
                ],
                answer: "ಶ್ರೀ ನರಸಿಂಹ ಸರಸ್ವತಿ ಸ್ವಾಮಿ(Sri Narasimha Saraswati Swamy)"
            },

            {
                question: "ಬೀದರ್ ಜಿಲ್ಲೆಯು ಯಾವ ಸಾಂಪ್ರದಾಯಿಕ ಲೋಹದ ಕರಕುಶಲ ಕಲೆಗೆ ಪ್ರಸಿದ್ಧವಾಗಿದೆ?(Which traditional metal handicraft is Bidar district world-famous for?)",
                options: [
                    "ಕಿನ್ನಾಳ ಕಲೆ(Kinhal Art)",
                    "ಚನ್ನಪಟ್ಟಣ ಗೊಂಬೆಗಳು(Channapatna Toys)",
                    "ಕಂಚಿನ ಶಿಲ್ಪಗಳು(Bronze Sculptures)",
                    "ಬಿದ್ರಿ ಕಲೆ(Bidriware)"
                ],
                answer: "ಬಿದ್ರಿ ಕಲೆ(Bidriware)"
            },

            {
                question: "ಧಾರವಾಡ ಜಿಲ್ಲೆಯ ಉಣಕಲ್ ಕೆರೆಯ ಸಮೀಪವಿರುವ, ಕಲ್ಯಾಣ ಚಾಲುಕ್ಯರ ಕಾಲದ ಪ್ರಸಿದ್ಧ 900 ವರ್ಷಗಳ ಪುರಾತನ ಶಿವಾಲಯ ಯಾವುದು?(Which 900-year-old Kalyana Chalukya-era temple dedicated to Lord Shiva is situated near Unkal Lake in Hubballi?)",
                options: [

                    "ಅಮೃತೇಶ್ವರ ದೇವಾಲಯ(Amruteshwara Temple)",
                    "ಚಂದ್ರಮೌಳೇಶ್ವರ ದೇವಾಲಯ(Chandramouleshwara Temple)",
                    "ಬನಶಂಕರಿ ದೇವಾಲಯ(Banashankari Temple)",
                    "ಸಿದ್ಧೇಶ್ವರ ದೇವಾಲಯ(Siddheshwara Temple)"
                ],
                answer: "ಚಂದ್ರಮೌಳೇಶ್ವರ ದೇವಾಲಯ(Chandramouleshwara Temple)"
            },

            {
                question: "ಧಾರವಾಡದ ವಿಶ್ವಪ್ರಸಿದ್ಧ ಸಾಂಪ್ರದಾಯಿಕ ಸಿಹಿ ತಿನಿಸಾದ 'ಧಾರವಾಡ ಪೇಡಾ'ವನ್ನು ಮೊದಲು ತಯಾರಿಸಿ ಜನಪ್ರಿಯಗೊಳಿಸಿದ ಕುಟುಂಬ ಯಾವುದು?(Which family originally created and popularized the GI-tagged sweet delicacy 'Dharwad Pedha'?)",
                options: [

                    "ಮಿಶ್ರಾ ಕುಟುಂಬ(Mishra Family)",
                    "ಜೋಶಿ ಕುಟುಂಬ(Joshi Family)",
                    "ಠಾಕೂರ್ ಕುಟುಂಬ(Thakur Family)",
                    "ಕುಲಕರ್ಣಿ ಕುಟುಂಬ(Kulkarni Family)"
                ],
                answer: "ಠಾಕೂರ್ ಕುಟುಂಬ(Thakur Family)"
            },

            {
                question: "ಲೋಕಮಾನ್ಯ ತಿಲಕ್ ಮತ್ತು ಮಹಾತ್ಮ ಗಾಂಧಿಯವರು ಭೇಟಿ ನೀಡಿದ್ದ ಹುಬ್ಬಳ್ಳಿಯ ಪ್ರಸಿದ್ಧ ಆಧ್ಯಾತ್ಮಿಕ ಮಠ ಯಾವುದು?(Which prominent spiritual center in Hubballi was visited by national leaders Lokmanya Tilak and Mahatma Gandhi?)",
                options: [
                    "ಮೂರುಸಾವಿರ ಮಠ(Moorusavira Matha)",
                    "ಶ್ರೀ ಸಿದ್ಧಾರೂಢ ಮಠ(Sri Siddharoodha Matha)",
                    "ರುದ್ರಾಕ್ಷಿ ಮಠ(Rudrakshi Matha)",
                    "ತಪೋವನ ಮಠ(Tapovana Matha)"
                ],
                answer: "ಶ್ರೀ ಸಿದ್ಧಾರೂಢ ಮಠ(Sri Siddharoodha Matha)"
            },

            {
                question: "ಕನ್ನಡ ಸಾಹಿತ್ಯ ಮತ್ತು ಏಕೀಕರಣ ಚಳವಳಿಗೆ ಮಹತ್ತರ ಕೊಡುಗೆ ನೀಡಿದ, 1890 ರಲ್ಲಿ ಧಾರವಾಡದಲ್ಲಿ ಸ್ಥಾಪನೆಯಾದ ಐತಿಹಾಸಿಕ ಸಂಸ್ಥೆ ಯಾವುದು?(Which historical institution was established in Dharwad in 1890 to spearhead the Karnataka unification movement and Kannada literature?)",
                options: [
                    "ಕರ್ನಾಟಕ ವಿದ್ಯಾವರ್ಧಕ ಸಂಘ(Karnataka Vidyavardhaka Sangha)",
                    "ಕನ್ನಡ ಸಾಹಿತ್ಯ ಪರಿಷತ್ತು(Kannada Sahitya Parishat)",
                    "ಕರ್ನಾಟಕ ಕುಲಪುರೋಹಿತ ಸಂಘ(Karnataka Kulapurohita Sangha)",
                    "ಮಿಥಿಕ್ ಸೊಸೈಟಿ(Mythic Society)"
                ],
                answer: "ಕರ್ನಾಟಕ ವಿದ್ಯಾವರ್ಧಕ ಸಂಘ(Karnataka Vidyavardhaka Sangha)"
            },

            {
                question: "ಉತ್ತರ ಕರ್ನಾಟಕದಲ್ಲಿ ಜಾನಪದ ಮತ್ತು ಲಂಬಾಣಿ ಕಸೂತಿ ಕಲೆಗೆ ಹೆಸರುವಾಸಿಯಾದ ಧಾರವಾಡದ ಪ್ರಸಿದ್ಧ ಹಸ್ತಶಿಲ್ಪ ಕಲೆ ಯಾವುದು?(Which traditional embroidery craft of the Banjara community is widely preserved and practiced in the Dharwad region?)",
                options: [

                    "ಇಳಕಲ್ ಕಲೆ(Ilkal Weave)",
                    "ಕಿನ್ನಾಳ ಕಲೆ(Kinhal Craft)",
                    "ಬಿದ್ರಿ ಕಲೆ(Bidri Craft)",
                    "ಕಸೂತಿ ಕಲೆ(Kasuti Embroidery)"
                ],
                answer: "ಕಸೂತಿ ಕಲೆ(Kasuti Embroidery)"
            },

            {
                question: "ಮಹಾತ್ಮಾ ಗಾಂಧೀಜಿಯವರು ಅಧ್ಯಕ್ಷತೆ ವಹಿಸಿದ್ದ ಏಕೈಕ ಐತಿಹಾಸಿಕ ಭಾರತೀಯ ರಾಷ್ಟ್ರೀಯ ಕಾಂಗ್ರೆಸ್ (INC) ಅಧಿವೇಶನವು 1924 ರಲ್ಲಿ ಬೆಳಗಾವಿಯ ಯಾವ ಸ್ಥಳದಲ್ಲಿ ನಡೆಯಿತು?(At which venue in Belagavi did Mahatma Gandhi preside over his only historic Indian National Congress session in 1924?)",
                options: [
                    "ಖಾನಾಪುರ(Khanapur)",
                    "ಕಿತ್ತೂರು(Kittur)",
                    "ವೀರಸೌಧ / ತಿಲಕವಾಡಿ(Veerasoudha / Tilakwadi)",
                    "ಸವದತ್ತಿ(Savadatti)"
                ],
                answer: "ವೀರಸೌಧ / ತಿಲಕವಾಡಿ(Veerasoudha / Tilakwadi)"
            },

            {
                question: "ಬೆಳಗಾವಿ ಜಿಲ್ಲೆಯ ಘಟಪ್ರಭಾ ನದಿಯಿಂದ ನಿರ್ಮಾಣವಾಗುವ 'ಕರ್ನಾಟಕದ ನಯಾಗರಾ' ಎಂದೇ ಪ್ರಸಿದ್ಧವಾಗಿರುವ ಸುಂದರ ಜಲಪಾತ ಯಾವುದು?(Which waterfall formed by the Ghataprabha River in Belagavi district is famously known as the 'Niagara of Karnataka'?)",
                options: [
                    "ಗೋದಚಿನಮಲ್ಕಿ ಜಲಪಾತ(Godchinamalaki Falls)",
                    "ದೂಧ್‌ಸಾಗರ್ ಜಲಪಾತ(Dhudhsagar Falls)",
                    "ಹಿಡ್ಕಲ್ ಜಲಪಾತ(Hidkal Falls)",
                    "ಗೋಕಾಕ್ ಜಲಪಾತ(Gokak Falls)"
                ],
                answer: "ಗೋಕಾಕ್ ಜಲಪಾತ(Gokak Falls)"
            },

            {
                question: "ಬಾದಾಮಿ ಚಾಲುಕ್ಯರ ಶಿಲ್ಪಕಲೆಯ ತೊಟ್ಟಿಲು ಎಂದು ಪ್ರಸಿದ್ಧವಾಗಿರುವ ಮತ್ತು ಭಾರತೀಯ ದೇವಾಲಯ ವಾಸ್ತುಶಿಲ್ಪದ ಪ್ರಯೋಗಶಾಲೆ ಎನಿಸಿಕೊಂಡ ಬಾಗಲಕೋಟೆ ಜಿಲ್ಲೆಯ ಐತಿಹಾಸಿಕ ಸ್ಥಳ ಯಾವುದು?(Which historical site in Bagalkote is celebrated as the 'Cradle of Indian Temple Architecture'?)",
                options: [

                    "ಪಟ್ಟದಕಲ್ಲು(Pattadakal)",
                    "ಐಹೊಳೆ(Aihole)",
                    "ಮಹಾಕೂಟ(Mahakuta)",
                    "ಬಾದಾಮಿ(Badami)"
                ],
                answer: "ಐಹೊಳೆ(Aihole)"
            },

            {
                question: "ಗೋಲ್ ಗುಂಬಜ್‌ನ ಒಳಭಾಗದಲ್ಲಿ ಸಣ್ಣ ಶಬ್ದವೂ ಹಲವು ಬಾರಿ ಪ್ರತಿಧ್ವನಿಸುವ ಅದ್ಭುತ ಶ್ರವಣ ವಾಸ್ತುಶಿಲ್ಪದ ಗ್ಯಾಲರಿಯನ್ನು ಏನೆಂದು ಕರೆಯುತ್ತಾರೆ?(What is the famous acoustic gallery inside Gol Gumbaz called, where even a whisper echoes multiple times?)",
                options: [
                    "ಪ್ರತಿಧ್ವನಿ ಮಹಲ್(Echo Mahal)",
                    "ಸಂಗೀತ ಮಹಲ್(Sangeet Mahal)",
                    "ಪಿಸುಗುಟ್ಟುವ ಗ್ಯಾಲರಿ(Whispering Gallery)",
                    "ಶಬ್ದ ಮಂಟಪ(Shabda Mantapa)"
                ],
                answer: "ಪಿಸುಗುಟ್ಟುವ ಗ್ಯಾಲರಿ(Whispering Gallery)"
            }
        ]
    };

function App() {
    const [currentRegion, setCurrentRegion] = useState(1);
    const [user, setUser] = useState(null);

    const [gameHistory, setGameHistory] = useState([]);


    const [authMode, setAuthMode] = useState("login");
    const [authName, setAuthName] = useState("");
    const [authEmail, setAuthEmail] = useState("");
    const [authPassword, setAuthPassword] = useState("");
    const [authMessage, setAuthMessage] = useState("");
    const [authLoading, setAuthLoading] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [score, setScore] = useState(0);
    const [quizQuestions,setQuizQuestions] = useState([]);
    const [gameUnlocked, setGameUnlocked] = useState(false);
    const [result, setResult] = useState(null);
    const [gameCompleted, setGameCompleted] = useState(false);
    const [regionScores, setRegionScores] = useState({
        1: 0,
        2: 0,
        3: 0,
        4: 0
    });
    const musicRef = useRef(null);

    const regionSongs = {
        1: region1Song,
        2: region2Song,
        3: region3Song,
        4: region4Song

    };
    console.log("Region Scores:", regionScores);


    const playMusic = (song) => {
        if (musicRef.current) {
            musicRef.current.pause();
            musicRef.current.currentTime = 0;
        }

        const audio = new Audio(song);

        audio.loop = true;
        audio.volume = 0.5;

        musicRef.current = audio;

        audio.play().catch(() => {
            console.log("Music will start after user interaction.");
        });
    };

    useEffect(() => {
        playMusic(introSong);

        return () => {
            if (musicRef.current) {
                musicRef.current.pause();
                musicRef.current = null;
            }
        };
    }, []);
    const handleAuth = async (e) => {
        e.preventDefault();

        setAuthLoading(true);
        setAuthMessage("");

        try {
            const endpoint =
                authMode === "login"
                    ? "/api/auth/login"
                    : "/api/auth/register";

            const requestBody =
                authMode === "login"
                    ? {
                        email: authEmail,
                        password: authPassword
                    }
                    : {
                        name: authName,
                        email: authEmail,
                        password: authPassword
                    };

            const response = await fetch(`${BACKEND_URL}${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Something went wrong. Please try again."
                );
            }

            if (authMode === "register") {
                setAuthMode("login");
                setAuthName("");
                setAuthPassword("");
                setAuthMessage("Registration successful! Please login.");
            } else {
                const loggedInUser = data.user || data;


                const loggedInUserData = {
                    id: loggedInUser.id || loggedInUser.userId,
                    name: loggedInUser.name,
                    email: loggedInUser.email
                };

                setUser(loggedInUserData);

                await fetchGameHistory(loggedInUserData.id);

                setAuthMessage("");
            }

        } catch (error) {
            console.error("Authentication error:", error);
            setAuthMessage(error.message || "Unable to connect to server.");
        } finally {
            setAuthLoading(false);
        }
    };
    const fetchGameHistory = async (userId) => {
        try {
            const response = await fetch(
                `${BACKEND_URL}/api/scores/user/${userId}`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch game history.");
            }

            const data = await response.json();

            const history = Array.isArray(data) ? data : [data];

            setGameHistory(history);

            console.log("Game history:", history);

        } catch (error) {
            console.error("Error fetching game history:", error);
            setGameHistory([]);
        }
    };

    const saveGameScore = async (finalRegionScores) => {
        if (!user) {
            console.error("No logged-in user found.");
            return false;
        }

        const finalTotal =
            finalRegionScores[1] +
            finalRegionScores[2] +
            finalRegionScores[3] +
            finalRegionScores[4];

        try {
            const response = await fetch(`${BACKEND_URL}/api/scores`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: user.id,
                    region1Score: finalRegionScores[1],
                    region2Score: finalRegionScores[2],
                    region3Score: finalRegionScores[3],
                    region4Score: finalRegionScores[4],
                    totalScore: finalTotal
                })
            });

            if (!response.ok) {
                throw new Error("Failed to save game score.");
            }

            const data = await response.json();

            console.log("Game score saved successfully:", data);

            return true;

        } catch (error) {
            console.error("Error saving game score:", error);
            return false;
        }
    };
    const unlockGame = () => {
        setGameUnlocked(true);

        // Start intro music
        playMusic(introSong);
    };

    const startGame = () => {
        if (musicRef.current) {
            musicRef.current.pause();
            musicRef.current.currentTime = 0;
            musicRef.current = null;
        }
        const shuffledQuestions = [...questions[currentRegion]]
            .sort(() => Math.random() - 0.5)
            .slice(0, 10);

        setQuizQuestions(shuffledQuestions);
        setGameStarted(true);
        setQuestionNumber(0);
        setScore(0);
        setResult(null);

        playMusic(regionSongs[currentRegion])
    };



    const answerQuestion = (isCorrect) => {
        const finalScore = isCorrect ? score + 1 : score;

        if (questionNumber < 9) {
            setScore(finalScore);
            setQuestionNumber(questionNumber + 1);
        } else {
            setScore(finalScore);
            setRegionScores(prev => ({
                ...prev,
                [currentRegion]: finalScore
            }));

            if (finalScore >= 5) {
                if (currentRegion < 4) {
                    setResult({
                        success: true,
                        score: finalScore,
                        message: `Congratulations! You are through to Region ${currentRegion + 1}.`
                    });
                } else {
                    setResult({
                        success: true,
                        score: finalScore,
                        message: "Congratulations! You completed all 4 regions!"
                    });
                }
            } else {
                setResult({
                    success: false,
                    score: finalScore,
                    message: "You need at least 5 correct answers. Please try again."
                });
            }

            setGameStarted(false);
        }
    };
    if (!user) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#f5f1e8",
                    padding: "20px"
                }}
            >
                <div
                    style={{
                        width: "100%",
                        maxWidth: "420px",
                        background: "white",
                        padding: "35px",
                        borderRadius: "20px",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                        textAlign: "center"
                    }}
                >
                    <h1 className="brand-kannataka">ಕನ್ನಡನಾಡಿನ</h1>
                    <h1 className="brand-brain">ಜ್ಞಾನ</h1>

                    <h2>
                        {authMode === "login"
                            ? "Welcome Back!"
                            : "Create Account"}
                    </h2>

                    <p>
                        {authMode === "login"
                            ? "Login to start your Karnataka journey."
                            : "Create your account to save your scores."}
                    </p>

                    <form onSubmit={handleAuth}>

                        {authMode === "register" && (
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={authName}
                                onChange={(e) => setAuthName(e.target.value)}
                                required
                                style={{
                                    width: "100%",
                                    padding: "12px",
                                    marginBottom: "12px",
                                    boxSizing: "border-box"
                                }}
                            />
                        )}

                        <input
                            type="email"
                            placeholder="Email"
                            value={authEmail}
                            onChange={(e) => setAuthEmail(e.target.value)}
                            required
                            style={{
                                width: "100%",
                                padding: "12px",
                                marginBottom: "12px",
                                boxSizing: "border-box"
                            }}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={authPassword}
                            onChange={(e) => setAuthPassword(e.target.value)}
                            required
                            style={{
                                width: "100%",
                                padding: "12px",
                                marginBottom: "15px",
                                boxSizing: "border-box"
                            }}
                        />

                        <button
                            type="submit"
                            className="start-button"
                            disabled={authLoading}
                        >
                            {authLoading
                                ? "PLEASE WAIT..."
                                : authMode === "login"
                                    ? "LOGIN"
                                    : "REGISTER"}
                        </button>
                    </form>

                    {authMessage && (
                        <p style={{ marginTop: "15px" }}>
                            {authMessage}
                        </p>
                    )}

                    <button
                        type="button"
                        onClick={() => {
                            setAuthMode(
                                authMode === "login"
                                    ? "register"
                                    : "login"
                            );
                            setAuthMessage("");
                        }}
                        style={{
                            marginTop: "15px",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            textDecoration: "underline"
                        }}
                    >
                        {authMode === "login"
                            ? "Don't have an account? Register"
                            : "Already have an account? Login"}
                    </button>
                </div>
            </div>
        );
    }


// STEP 3 - FINAL COMPLETION SCREEN
    if (gameCompleted) {

        const totalScore =
            regionScores[1] +
            regionScores[2] +
            regionScores[3] +
            regionScores[4];

        return (
            <div className="final-screen">

                <div className="final-content">

                    {/* LEFT SIDE - RAJKUMAR + CONGRATULATIONS */}
                    <div className="final-left">

                        <img
                            src={drRajkumar}
                            alt="Dr. Rajkumar"
                            className="final-character"
                        />

                        <div className="final-message">

                            <h1>KARNATAKA BRAIN</h1>

                            <h2>🎉 Congratulations!</h2>
                            <h2>
                                <strong>ಕರ್ನಾಟಕದ ಜ್ಞಾನ ಯಾತ್ರೆಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಪೂರ್ಣಗೊಳಿಸಿದ್ದೀರಿ! ❤️</strong></h2>

                            <p>
                               <strong>You have successfully completed all 4 regions.</strong>
                            </p>



                        </div>

                    </div>


                    {/* RIGHT SIDE - SCORE SHEET */}
                    <div className="final-score-section">

                        <div className="score-card">

                            <h3>🏆 FINAL SCORE</h3>

                            <div className="region-score">
                                <span>Region 1 — OLD MYSORE</span>
                                <strong>= {regionScores[1]} / 10</strong>
                            </div>

                            <div className="region-score">
                                <span>Region 2 — MALE-NADU</span>
                                <strong>= {regionScores[2]} / 10</strong>
                            </div>

                            <div className="region-score">
                                <span>Region 3 — KARAVALI</span>
                                <strong>= {regionScores[3]} / 10</strong>
                            </div>

                            <div className="region-score">
                                <span>Region 4 — NORTH-KARNATAKA</span>
                                <strong>= {regionScores[4]} / 10</strong>
                            </div>


                            <div className="total-score">
                                <span>TOTAL SCORE</span>
                                <strong>= {totalScore} / 40</strong>
                            </div>

                            <div
                                style={{
                                    marginTop: "25px",
                                    padding: "20px",
                                    background: "rgba(255,255,255,0.8)",
                                    borderRadius: "15px",
                                    maxWidth: "500px",
                                    width: "100%",
                                    boxSizing: "border-box"
                                }}
                            >
                                <h3>📜 MY GAME HISTORY</h3>

                                {gameHistory.length === 0 ? (
                                    <p>No previous games found.</p>
                                ) : (
                                    gameHistory.map((game, index) => (
                                        <div
                                            key={game.id || index}
                                            style={{
                                                padding: "12px",
                                                marginBottom: "10px",
                                                borderBottom: "1px solid #ddd"
                                            }}
                                        >
                                            <strong>
                                                Game {gameHistory.length - index}
                                            </strong>

                                            <p>
                                                Region 1: {game.region1Score} / 10
                                            </p>

                                            <p>
                                                Region 2: {game.region2Score} / 10
                                            </p>

                                            <p>
                                                Region 3: {game.region3Score} / 10
                                            </p>

                                            <p>
                                                Region 4: {game.region4Score} / 10
                                            </p>

                                            <strong>
                                                Total: {game.totalScore} / 40
                                            </strong>

                                            {game.playedAt && (
                                                <p>
                                                    Played:{" "}
                                                    {new Date(game.playedAt).toLocaleString()}
                                                </p>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>


                        </div>


                        {/* MODERN PLAY AGAIN BUTTON */}
                        <button
                            className="play-again-button"
                            onClick={() => {

                                if (musicRef.current) {
                                    musicRef.current.pause();
                                    musicRef.current.currentTime = 0;
                                    musicRef.current = null;
                                }

                                setGameCompleted(false);
                                setGameUnlocked(false);
                                setCurrentRegion(1);
                                setGameStarted(false);
                                setQuestionNumber(0);
                                setScore(0);

                                setRegionScores({
                                    1: 0,
                                    2: 0,
                                    3: 0,
                                    4: 0
                                });

                            }}
                        >
                            🔄 PLAY AGAIN
                        </button>

                    </div>

                </div>

            </div>


        );
    }




    return (
        <div className="game">

            {result && (
                <div className="result-overlay">
                    <div className="result-popup">

                        <h2>
                            {result.success ? "🎉 REGION CLEARED!" : "❌ TRY AGAIN"}
                        </h2>

                        <p>
                            You scored <strong>{result.score} / 10</strong>
                        </p>

                        <p>{result.message}</p>

                        <button
                            onClick={async() => {
                                setResult(null);

                                if (result.success) {
                                    if (currentRegion < 4) {
                                        setCurrentRegion(currentRegion + 1);
                                        setGameStarted(false);
                                        setQuestionNumber(0);
                                        setScore(0);

                                    } else {
                                        const finalRegionScores = {
                                            ...regionScores,
                                            4: result.score
                                        };

                                       await saveGameScore(finalRegionScores);
                                       await fetchGameHistory(user.id);


                                        // STOP REGION 4 MUSIC
                                        if (musicRef.current) {
                                            musicRef.current.pause();
                                            musicRef.current.currentTime = 0;
                                            musicRef.current = null;
                                        }

                                        // START HUTTIDARE SONG
                                        const finalAudio = new Audio(huttidare);

                                        finalAudio.loop = true;
                                        finalAudio.volume = 0.5;

                                        musicRef.current = finalAudio;

                                        finalAudio.play()
                                            .then(() => {
                                                console.log("Huttidare song started successfully");
                                            })
                                            .catch((error) => {
                                                console.error("Huttidare song failed to play:", error);
                                            });

                                        setGameStarted(false);
                                        setGameCompleted(true);
                                        setQuestionNumber(0);
                                        setScore(0);
                                    }

                                } else {
                                    setGameStarted(false);
                                    setQuestionNumber(0);
                                    setScore(0);
                                }
                            }}
                        >
                            {result.success
                                ? currentRegion < 4
                                    ? "CONTINUE"
                                    : "FINISH"
                                : "TRY AGAIN"}
                        </button>

                    </div>
                </div>
            )}




        {/* Header */}
        <header className="game-header">
            <h1><strong>ಕನ್ನಡನಾಡಿನ ಜ್ಞಾನ(KARNATAKA BRAIN GAME)</strong></h1>
            <p className="honesty-message">
                <strong> ನಾವು ಕನ್ನಡಿಗರು, ವಿಶಾಲ ಹೃದಯದವರು. ❤️</strong>
                <br />
                <strong> ನಿಜವಾದ ಕನ್ನಡಿಗ ಯಾವಾಗಲೂ ಪ್ರಾಮಾಣಿಕತೆಯಿಂದ ಆಡುತ್ತಾನೆ.</strong>
                <br />
                <strong> ChatGPT ಬೇಡ. Google ಬೇಡ. Gemini ಬೇಡ. ಯಾವುದೇ AI ಬೇಡ. ಮೋಸ ಮಾಡಬೇಡಿ.</strong>
                <br />
                <strong> ನಿಮಗೆ ನಿಜವಾಗಿಯೂ ತಿಳಿದಿರುವುದನ್ನು ಮಾತ್ರ ಉತ್ತರಿಸಿ.</strong>
                <br />
                <strong> ನಿಮ್ಮ ಅಂಕಗಳು ನಿಮ್ಮ ಕರ್ನಾಟಕದ ಜ್ಞಾನವನ್ನು ಸಾಬೀತುಪಡಿಸಲಿ.</strong>
            </p>
            <p><strong>ನಿಮ್ಮ ಕರ್ನಾಟಕದ ಜ್ಞಾನವನ್ನು ಪರೀಕ್ಷಿಸಿ ಮತ್ತು ನಿಮ್ಮ ಪಯಣವನ್ನು ಆರಂಭಿಸಿ. 🚀(Test Your Karnataka Knowledge and begin your journey!!)</strong></p>
        </header>

        {/* Karnataka Map */}
        <main className="map-section">

          <div className="map-container">

            <img
                src={karnatakaMap}
                alt="Karnataka Map"
                className="karnataka-map"
            />



            {/* Character */}

              <img
                  src={character}
                  alt="Kannada character"
                  className={`character character-region-${currentRegion}`}
              />


          </div>

            {/* Game Status */}
            <div className="game-status">

                {!gameStarted ? (
                    <>
                        <h2>Region {currentRegion}</h2>

                        <p>
                            Answer at least 5 questions correctly to proceed to the next region
                        </p>


                        {!gameUnlocked && (
                            <button
                                className="start-button"
                                onClick={unlockGame}
                            >
                                ▶ PLAY GAME
                            </button>
                        )}

                        <button
                            className="start-button"
                            onClick={startGame}
                            disabled={!gameUnlocked}
                        >
                            {currentRegion === 1 ? "🎮 START GAME" : "▶ CONTINUE"}
                        </button>
                    </>
                ) : (
                    <div className="quiz-screen">

                        <h2>Region {currentRegion}</h2>

                        <p>
                            Question {questionNumber + 1} of 10
                        </p>

                        <p>
                            Score: {score}
                        </p>

                        <h3>
                            {quizQuestions[questionNumber].question}
                        </h3>

                        <div className="answer-buttons">

                            {quizQuestions[questionNumber].options.map((option) => (

                                <button
                                    key={option}
                                    onClick={() => answerQuestion(
                                        option === quizQuestions[questionNumber].answer
                                    )}
                                >
                                    {option}
                                </button>

                            ))}

                        </div>

                    </div>
                )}

            </div>


            {/* Game Instructions */}
            <div className="game-info">
                <span className="trophy">🏆</span>


            </div>


        </main>

      </div>
  );
}

export default App;
