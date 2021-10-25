import React, { Component } from "react";
import {Helmet} from "react-helmet";
class Welcome extends Component {
    render() {
        return (
            <div class="body-wrap">
        <header class="site-header">
            <div class="container">
                <div class="site-header-inner">
                    <div class="brand header-brand">
                        <h1 class="m-0">
							<a href>
								<img width="200" class="header-logo-image" src="https://gauth-x.web.app/static/media/logo.05dab920.png" alt="Logo"/>
                            </a>
                        </h1>
                    </div>
                </div>
            </div>
        </header>

        <main>
            <section class="hero">
                <div class="container">
                    <div class="hero-inner">
						<div class="hero-copy">
	                        <h1 class="hero-title mt-0">Gauth</h1>
	                        <p class="hero-paragraph">Our Gauth can help you to memorize your password by graphical user authentication that uses images rather than letters, digits, or special characters.</p>
	                        <div class="hero-cta"><a class="button button-primary" target="_parent" href="/login">Login</a><a class="button" href="signup">Signup</a></div>
						</div>
						<div class="hero-figure anime-element">
							<svg class="placeholder" width="528" height="396" viewBox="0 0 528 396">
								<rect width="528" height="396" style={{fill:"transparent"}} />
							</svg>
							<div class="hero-figure-box hero-figure-box-01" data-rotation="45deg"></div>
							<div class="hero-figure-box hero-figure-box-02" data-rotation="-45deg"></div>
							<div class="hero-figure-box hero-figure-box-03" data-rotation="0deg"></div>
							<div class="hero-figure-box hero-figure-box-04" data-rotation="-135deg"></div>
							<div class="hero-figure-box hero-figure-box-05"></div>
							<div class="hero-figure-box hero-figure-box-06"></div>
							<div class="hero-figure-box hero-figure-box-07"></div>
							<div class="hero-figure-box hero-figure-box-08" data-rotation="-22deg"></div>
							<div class="hero-figure-box hero-figure-box-09" data-rotation="-52deg"></div>
							<div class="hero-figure-box hero-figure-box-10" data-rotation="-50deg"></div>
						</div>
                    </div>
                </div>
            </section>

            <section class="features section">
                <div class="container">
					<div class="features-inner section-inner has-bottom-divider">
                        <div class="features-wrap">
                            <div class="feature text-center is-revealing">
                                <div class="feature-inner">
                                    <div class="feature-icon">
										<img src="https://gauth-landing-page.web.app/dist/images/feature-icon-01.svg" alt="Feature 01"/>
                                    </div>
                                    <h4 class="feature-title mt-24">Encrypted Images</h4>
                                    <p class="text-sm mb-0" style={{color: "grey"}}>Images that are being used for graphical authentication are completely encrypted by secure Encryption Algorithms.</p>
                                </div>
                            </div>
							<div class="feature text-center is-revealing">
                                <div class="feature-inner">
                                    <div class="feature-icon">
										<img src="https://gauth-landing-page.web.app/dist/images/feature-icon-02.svg" alt="Feature 02"/>
                                    </div>
                                    <h4 class="feature-title mt-24">Secure signup</h4>
                                    <p class="text-sm mb-0" style={{color: "grey"}}>Vital information of user data is being stored in completely encrypted format.</p>
                                </div>
                            </div>
                            <div class="feature text-center is-revealing">
                                <div class="feature-inner">
                                    <div class="feature-icon">
										<img src="https://gauth-landing-page.web.app/dist/images/feature-icon-03.svg" alt="Feature 03"/>
                                    </div>
                                    <h4 class="feature-title mt-24">Low Latency</h4>
                                    <p class="text-sm mb-0" style={{color: "grey"}}>Even with all these complex encryption algorithms, Gauth can response much faster with efficient decryption mechanisms then expected because of the caching layer.</p>
                                </div>
                            </div>                            
                        </div>
                    </div>
                </div>
            </section>

            <section class="pricing section">
                <div class="container-sm">
                    <div class="pricing-inner section-inner">
                        <div class="pricing-header text-center">
                            <h2 class="section-title mt-0">Free for all</h2>                            
                        </div>						
                    </div>
                </div>
            </section>

			<section class="cta section">
				<div class="container">
					<div class="cta-inner section-inner">
						<h3 class="section-title mt-0">Still not convinced</h3>
						<div class="cta-cta">
							<a class="button button-primary button-wide-mobile" href="/signup">Signup to get started</a>
						</div>
					</div>
				</div>
			</section>
        </main>

        <footer class="site-footer">
            <div class="container">
                <div class="site-footer-inner">
                    <div class="brand footer-brand">
						<a href>
							<img width="200" class="header-logo-image" src="https://gauth-x.web.app/static/media/logo.05dab920.png" alt="Logo"/>
						</a>
                    </div>
                    <div class="footer-copyright">&copy; 2019 Solid, all rights reserved</div>
                </div>
            </div>
        </footer>
        <Helmet>
            <script src = "https://gauth-landing-page.web.app/dist/js/main.min.js" type = "text/javascript" />
            <script src="https://unpkg.com/animejs@3.0.1/lib/anime.min.js"></script>
            <script src="https://unpkg.com/scrollreveal@4.0.0/dist/scrollreveal.min.js"></script>
            <link rel="stylesheet" href="https://gauth-landing-page.web.app/dist/css/style.css"></link>
        </Helmet>
    </div>
    
        );
    }
}

export default Welcome;