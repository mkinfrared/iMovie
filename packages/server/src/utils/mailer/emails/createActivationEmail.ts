const createActivationEmail = (link: string) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="reset.css">
    <link rel="stylesheet" href="style.css">
  </head>
  <body style="margin: 0; padding: 0; font-family: sans-serif; font-size: 1vw;">
    <div class="wrapper" style="box-sizing: border-box; width: 100%; min-height: 100vh;">
      <div class="container" style="box-sizing: border-box; max-width: 900px; margin: 0 auto;">
        <div class="header" style="box-sizing: border-box; background-color: #000000; padding: 1vw;">
          <div class="icon" style="box-sizing: border-box; height: 33vh; text-align: center;">
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewbox="0 0 512.007 512.007" style="box-sizing: border-box; height: 100%; enable-background: new 0 0 512.007 512.007;" xml:space="preserve">
              <circle style="box-sizing: border-box; fill: #f57c00;" cx="256.003" cy="256.003" r="256.003"/>
              <path style="box-sizing: border-box; fill: #e65100;" d="M256,79.782L256,79.782l-40.348,128.388l-134.573-1.3l101.698,101.698l-34.884,103.933l0,0
	l99.333,99.333c2.914,0.099,5.835,0.166,8.773,0.166c131.176,0,239.29-98.666,254.222-225.83l-79.301-79.301l-47.375,0.458
	L256,79.782z"/>
              <polygon style="box-sizing: border-box; fill: #FFFFFF;" points="256,79.782 296.349,208.17 430.921,206.869 321.284,284.916 364.107,412.501 256,332.349
	147.893,412.501 190.716,284.916 81.08,206.869 215.652,208.17 "/>
              <rect x="219.871" y="229.483" style="box-sizing: border-box; fill: #f57c00;" width="59.38" height="53.037"/>
              <rect x="210.14" y="238.563" style="box-sizing: border-box; fill: #f57c00;" width="6.702" height="12.538"/>
              <polygon style="box-sizing: border-box; fill: #f57c00;" points="282.483,248.562 282.483,263.438 301.86,276.249 301.86,235.751 	"/>
            </svg>
          </div>
        </div>
        <div class="content" style="box-sizing: border-box; padding: 2rem; background-color: #FFFFFF;">
          <h1 style="box-sizing: border-box; font-size: 2rem; text-align: center; margin: 1rem; text-transform: uppercase;">Confirm your registration</h1>
          <p style="box-sizing: border-box; text-align: justify; line-height: 3rem; font-size: 1.2rem;">
            You requested your registration at iMovie. To confirm your
            registration, please click the button below. If it was not you
            please ignore this email. Thank you!
          </p>
          <div class="confirm" style="box-sizing: border-box; margin: 3rem; text-align: center;">
            <a href="${link}" target="_blank" style="box-sizing: border-box; font-size: 1.4rem; display: inline-block; text-align: center; margin: 0 auto; text-decoration: none; text-transform: uppercase; background-color: #ef6c00; color: #ffffff; padding: 1.4rem; border-radius: 20px;">confirm</a>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
`;

export default createActivationEmail;
