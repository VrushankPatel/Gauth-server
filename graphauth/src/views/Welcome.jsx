import React, { Component } from "react";
import {Helmet} from "react-helmet";

class Welcome extends Component {
    render() {
        return (
            <div className="body-wrap">
        <header className="site-header">
            <div className="container">
                <div className="site-header-inner">
                    <div className="brand header-brand">
                        <h1 className="m-0">
							<a href>
								<img width="200" className="header-logo-image" src="https://gauth-x.web.app/static/media/logo.05dab920.png" alt="Logo"/>
                            </a>
                        </h1>
                    </div>
                </div>
            </div>
        </header>

        <main>
            <section className="hero">
                <div className="container">
                    <div className="hero-inner">
						<div className="hero-copy">
	                        <h1 className="hero-title mt-0">Gauth</h1>
	                        <p className="hero-paragraph">Our Gauth can help you to memorize your password by graphical user authentication that uses images rather than letters, digits, or special characters.</p>
	                        <div className="hero-cta"><a className="button button-primary" target="_parent" href="/login">Login</a><a className="button" href="signup">Signup</a></div>
						</div>
						<div className="hero-figure anime-element">
							<svg className="placeholder" width="528" height="396" viewBox="0 0 528 396">
								<rect width="528" height="396" style={{fill:"transparent"}} />
							</svg>
							<div className="hero-figure-box hero-figure-box-01" data-rotation="45deg"></div>
							<div className="hero-figure-box hero-figure-box-02" data-rotation="-45deg"></div>
							<div className="hero-figure-box hero-figure-box-03" data-rotation="0deg"></div>
							<div className="hero-figure-box hero-figure-box-04" data-rotation="-135deg"></div>
							<div className="hero-figure-box hero-figure-box-05"></div>
							<div className="hero-figure-box hero-figure-box-06"></div>
							<div className="hero-figure-box hero-figure-box-07"></div>
							<div className="hero-figure-box hero-figure-box-08" data-rotation="-22deg"></div>
							<div className="hero-figure-box hero-figure-box-09" data-rotation="-52deg"></div>
							<div className="hero-figure-box hero-figure-box-10" data-rotation="-50deg"></div>
						</div>
                    </div>
                </div>
            </section>

            <section className="features section">
                <div className="container">
					<div className="features-inner section-inner has-bottom-divider">
                        <div className="features-wrap">
                            <div className="feature text-center is-revealing">
                                <div className="feature-inner">
                                    <div className="feature-icon">
										<img src="https://preview.cruip.com/solid/dist/images/feature-icon-01.svg" alt="Feature 01"/>
                                    </div>
                                    <h4 className="feature-title mt-24">Encrypted Images</h4>
                                    <p className="text-sm mb-0" style={{color: "grey"}}>Images that are being used for graphical authentication are completely encrypted by secure Encryption Algorithms.</p>
                                </div>
                            </div>
							<div className="feature text-center is-revealing">
                                <div className="feature-inner">
                                    <div className="feature-icon">
										<img src="https://preview.cruip.com/solid/dist/images/feature-icon-02.svg" alt="Feature 02"/>
                                    </div>
                                    <h4 className="feature-title mt-24">Secure signup</h4>
                                    <p className="text-sm mb-0" style={{color: "grey"}}>Vital information of user data is being stored in completely encrypted format.</p>
                                </div>
                            </div>
                            <div className="feature text-center is-revealing">
                                <div className="feature-inner">
                                    <div className="feature-icon">
										<img src="https://preview.cruip.com/solid/dist/images/feature-icon-03.svg" alt="Feature 03"/>
                                    </div>
                                    <h4 className="feature-title mt-24">Low Latency</h4>
                                    <p className="text-sm mb-0" style={{color: "grey"}}>Even with all these complex encryption algorithms, Gauth can response much faster with efficient decryption mechanisms then expected because of the caching layer.</p>
                                </div>
                            </div>                            
                        </div>
                    </div>
                </div>
            </section>

            <section className="pricing section">
                <div className="container-sm">
                    <div className="pricing-inner section-inner">
                        <div className="pricing-header text-center">
                            <h2 className="section-title mt-0">Free for all</h2>                            
                        </div>						
                    </div>
                </div>
            </section>

			<section className="cta section">
				<div className="container">
					<div className="cta-inner section-inner">
						<h3 className="section-title mt-0">Still not convinced</h3>
						<div className="cta-cta">
							<a className="button button-primary button-wide-mobile" href="/signup">Signup to get started</a>
						</div>
					</div>
				</div>
			</section>
        </main>

        <footer className="site-footer">
            <div className="container">
                <div className="site-footer-inner">
                    <div className="brand footer-brand">
						<a href="/">
							<img width="200" className="header-logo-image" src="https://gauth-x.web.app/static/media/logo.05dab920.png" alt="Logo"/>
						</a>
                    </div>
                    <div className="footer-copyright">&copy; 2019 Solid, all rights reserved</div>
                </div>
            </div>
        </footer>
        <Helmet>
            <script src = "https://preview.cruip.com/solid/dist/js/main.min.js" type = "text/javascript" />
            <script src="https://unpkg.com/animejs@3.0.1/lib/anime.min.js"></script>
            <script src="https://unpkg.com/scrollreveal@4.0.0/dist/scrollreveal.min.js"></script>
            <link rel="stylesheet" href="https://preview.cruip.com/solid/dist/css/style.css"></link>
        </Helmet>
    </div>
    
        );
    }
}

export default Welcome;