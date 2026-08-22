* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
}

body {
    font-family: Arial, Helvetica, sans-serif;
    color: #ffffff;
    background:
        radial-gradient(circle at 80% 10%, #103c50 0, transparent 30%),
        radial-gradient(circle at 10% 50%, #211344 0, transparent 35%),
        #050912;
    line-height: 1.6;
}

a {
    text-decoration: none;
    color: inherit;
}

/* NAVBAR */

.navbar {
    position: sticky;
    top: 0;
    z-index: 100;

    height: 76px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 7%;

    background: rgba(5, 9, 18, 0.78);
    backdrop-filter: blur(18px);

    border-bottom: 1px solid rgba(255,255,255,0.08);
}

.logo {
    font-size: 24px;
    font-weight: 800;
}

.logo span:first-child {
    color: #00e5c3;
}

.green {
    color: #00e5c3;
}

.navbar nav {
    display: flex;
    gap: 30px;
}

.navbar nav a {
    color: #929db1;
    transition: .3s;
}

.navbar nav a:hover {
    color: #00e5c3;
}

.nav-button {
    padding: 10px 17px;

    border: 1px solid rgba(0,229,195,.4);
    border-radius: 10px;

    color: #00e5c3;

    transition: .3s;
}

.nav-button:hover {
    background: #00e5c3;
    color: #03110e;
}


/* HERO */

.hero {
    min-height: 92vh;

    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 60px;

    padding: 90px 8%;
}

.hero-content {
    max-width: 720px;
}

.tag {
    display: inline-block;

    padding: 8px 14px;

    border-radius: 30px;

    color: #00e5c3;

    background: rgba(0,229,195,.08);

    border: 1px solid rgba(0,229,195,.25);

    font-size: 12px;
    font-weight: bold;
    letter-spacing: 1.5px;
}

.hero h1 {
    font-size: clamp(48px, 7vw, 82px);
    line-height: 1.03;

    margin: 25px 0;
}

.hero h1 span,
.section-heading span,
.about span {
    color: #00e5c3;
}

.hero-content > p {
    max-width: 620px;

    color: #9aa6b9;

    font-size: 18px;
}

.hero-buttons {
    display: flex;
    gap: 15px;

    margin-top: 35px;
}

.main-button,
.outline-button {
    padding: 15px 22px;

    border-radius: 12px;

    transition: .3s;
}

.main-button {
    color: #03110e;
    background: #00e5c3;
    font-weight: bold;

    box-shadow: 0 0 30px rgba(0,229,195,.12);
}

.main-button:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 40px rgba(0,229,195,.2);
}

.outline-button {
    border: 1px solid #2a3850;
}

.outline-button:hover {
    border-color: #00e5c3;
}

.mini-stats {
    display: flex;
    gap: 45px;

    margin-top: 45px;
}

.mini-stats strong {
    display: block;

    color: #00e5c3;

    font-size: 22px;
}

.mini-stats span {
    color: #6f7b90;
    font-size: 13px;
}


/* HERO CARD */

.hero-visual {
    position: relative;

    width: 390px;
    height: 430px;

    display: grid;
    place-items: center;
}

.glow {
    position: absolute;

    width: 300px;
    height: 300px;

    background: #00e5c3;

    filter: blur(120px);

    opacity: .12;
}

.ai-card {
    position: relative;

    width: 350px;

    padding: 30px;

    border-radius: 25px;

    background:
        linear-gradient(
            145deg,
            rgba(20,35,55,.95),
            rgba(7,15,28,.95)
        );

    border: 1px solid rgba(0,229,195,.2);

    box-shadow:
        0 30px 80px rgba(0,0,0,.5);

    animation: float 4s ease-in-out infinite;
}

@keyframes float {
    0%,100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-15px);
    }
}

.card-header {
    display: flex;
    justify-content: space-between;

    color: #647287;

    font-size: 11px;
}

.online {
    color: #00e5c3;
}

.chip {
    width: 95px;
    height: 95px;

    margin: 55px auto 25px;

    display: grid;
    place-items: center;

    border-radius: 50%;

    font-size: 42px;

    background: rgba(0,229,195,.1);

    border: 1px solid rgba(0,229,195,.45);

    box-shadow:
        0 0 50px rgba(0,229,195,.15);
}

.ai-card h2 {
    font-size: 30px;
    line-height: 1.15;
}

.ai-card p {
    margin-top: 10px;

    color: #7f8ba0;
}

.wave {
    height: 40px;

    margin-top: 30px;

    border-bottom: 2px solid #00e5c3;

    border-radius: 50%;
}


/* SECTIONS */

.section {
    padding: 110px 8%;
}

.section-heading {
    max-width: 700px;

    margin-bottom: 45px;
}

.section-heading h2,
.about h2 {
    font-size: clamp(38px,5vw,60px);

    line-height: 1.1;

    margin: 20px 0;
}

.section-heading p,
.about p {
    color: #8f9bae;

    font-size: 17px;
}


/* AI */

.assistant-box {
    max-width: 950px;

    margin: auto;

    padding: 25px;

    border-radius: 24px;

    background: rgba(13,24,41,.85);

    border: 1px solid rgba(255,255,255,.08);

    box-shadow: 0 30px 70px rgba(0,0,0,.3);
}

.assistant-top {
    display: flex;
    align-items: center;
    gap: 15px;

    padding-bottom: 20px;

    border-bottom: 1px solid #233047;
}

.assistant-icon {
    width: 48px;
    height: 48px;

    display: grid;
    place-items: center;

    border-radius: 14px;

    background: rgba(0,229,195,.1);

    color: #00e5c3;

    font-size: 23px;
}

.assistant-top h3 {
    font-size: 17px;
}

.assistant-top p {
    color: #69778c;
    font-size: 13px;
}

.status {
    margin-left: auto;

    color: #00e5c3;

    font-size: 11px;
}

.chat-area {
    min-height: 180px;

    padding: 25px 5px;
}

.bot-message {
    display: inline-block;

    max-width: 500px;

    padding: 14px 18px;

    border-radius: 15px 15px 15px 3px;

    background: #17243a;

    color: #d5dce7;
}

.chat-input {
    display: flex;
    gap: 10px;
}

.chat-input input {
    flex: 1;

    padding: 16px;

    border-radius: 12px;

    background: #091221;

    border: 1px solid #26344b;

    color: white;

    outline: none;
}

.chat-input input:focus {
    border-color: #00e5c3;
}

.chat-input button {
    border: none;

    padding: 0 22px;

    border-radius: 12px;

    background: #00e5c3;

    font-weight: bold;

    cursor: pointer;
}


/* CIRCUITS */

.circuit-section {
    background: rgba(7,13,24,.55);
}

.circuit-search {
    max-width: 950px;

    display: flex;

    margin: auto;

    padding: 8px;

    border-radius: 16px;

    background: #0d1728;

    border: 1px solid #273650;
}

.search-icon {
    display: grid;
    place-items: center;

    width: 55px;

    color: #00e5c3;
}

.circuit-search input {
    flex: 1;

    border: none;
    outline: none;

    background: transparent;

    color: white;

    font-size: 16px;
}

.circuit-search button {
    padding: 15px 23px;

    border: none;

    border-radius: 11px;

    background: #00e5c3;

    cursor: pointer;

    font-weight: bold;
}

.circuit-result {
    max-width: 950px;

    margin: 25px auto 0;

    display: grid;

    grid-template-columns: 1fr 1fr;

    gap: 20px;
}

.circuit-info,
.diagram-box {
    min-height: 260px;

    padding: 30px;

    border-radius: 20px;

    background: rgba(14,25,42,.85);

    border: 1px solid rgba(255,255,255,.08);
}

.circuit-info {
    display: flex;

    gap: 20px;
}

.big-icon {
    font-size: 45px;
}

.small-title {
    color: #00e5c3;

    font-size: 11px;

    letter-spacing: 1px;
}

.circuit-info h3 {
    margin: 10px 0;

    font-size: 28px;
}

.circuit-info p,
.diagram-box p {
    color: #8491a6;
}

.diagram-box {
    display: flex;

    flex-direction: column;

    justify-content: center;

    align-items: center;

    text-align: center;
}

.diagram-icon {
    font-size: 55px;

    margin-bottom: 15px;
}


/* COMPONENTS */

.component-grid {
    display: grid;

    grid-template-columns: repeat(4,1fr);

    gap: 18px;
}

.component-card {
    padding: 28px;

    border-radius: 20px;

    background: #0d1728;

    border: 1px solid #1e2b42;

    transition: .3s;
}

.component-card:hover {
    transform: translateY(-8px);

    border-color: #00e5c3;

    box-shadow: 0 15px 40px rgba(0,229,195,.08);
}

.component-icon {
    font-size: 38px;

    margin-bottom: 18px;
}

.component-card h3 {
    margin-bottom: 8px;
}

.component-card p {
    color: #7f8ca0;
    font-size: 14px;
}


/* LEARNING */

.learning-grid {
    display: grid;

    grid-template-columns: repeat(4,1fr);

    gap: 18px;
}

.learning-card {
    padding: 28px;

    border-radius: 20px;

    background: #0d1728;

    border: 1px solid #1e2b42;

    transition: .3s;
}

.learning-card:hover {
    transform: translateY(-7px);

    border-color: #00e5c3;
}

.learning-card > span {
    color: #00e5c3;

    font-weight: bold;
}

.learning-card h3 {
    font-size: 23px;

    margin: 20px 0 10px;
}

.learning-card p {
    color: #7f8ca0;

    font-size: 14px;
}


/* ABOUT */

.about {
    padding: 100px 8%;

    text-align: center;

    background:
        radial-gradient(circle, rgba(0,229,195,.08), transparent 50%);
}

.about-content {
    max-width: 750px;

    margin: auto;
}

.tech-list {
    display: flex;

    flex-wrap: wrap;

    justify-content: center;

    gap: 10px;

    margin-top: 30px;
}

.tech-list span {
    padding: 8px 14px;

    border-radius: 20px;

    background: #111d31;

    border: 1px solid #263650;

    color: #9eabbe;

    font-size: 13px;
}


/* FOOTER */

footer {
    padding: 35px 8%;

    display: flex;

    justify-content: space-between;

    border-top: 1px solid #172238;

    color: #657188;
}

footer .logo {
    color: white;
}


/* MOBILE */

@media(max-width: 900px) {

    .navbar nav,
    .nav-button {
        display: none;
    }

    .hero {
        flex-direction: column;

        text-align: center;

        padding-top: 60px;
    }

    .hero-content > p {
        margin: auto;
    }

    .hero-buttons,
    .mini-stats {
        justify-content: center;
    }

    .hero-visual {
        width: 100%;
    }

    .circuit-result {
        grid-template-columns: 1fr;
    }

    .component-grid,
    .learning-grid {
        grid-template-columns: 1fr 1fr;
    }
}

@media(max-width: 550px) {

    .hero h1 {
        font-size: 46px;
    }

    .hero-buttons {
        flex-direction: column;
    }

    .mini-stats {
        gap: 20px;
    }

    .component-grid,
    .learning-grid {
        grid-template-columns: 1fr;
    }

    .circuit-search {
        flex-wrap: wrap;
    }

    .circuit-search input {
        min-width: 200px;
    }

    .circuit-search button {
        width: 100%;
    }

    footer {
        flex-direction: column;
        gap: 15px;
    }
}
