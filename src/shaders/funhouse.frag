#ifdef GL_ES
precision mediump float;
#endif
varying vec2 vTexCoord;

uniform vec2 uRes;
uniform float uTime;
uniform sampler2D uTex0;

// set up constants, effects ripple behaviour
float violence = 0.02;
float levelOfExtreme = 6.0;

// function warp x or y coordinate based on uTime and sin that shit
float warp( float a )
{
    float timeMod = uTime + a;
    return a + sin( timeMod * levelOfExtreme ) * violence;
}

// main thing
void main()
{
    // get 0..1 uv coords instead of pixel coords
    vec2 uv = (gl_FragCoord.xy / uRes.xy);
    
    // warp each uv coord seperately using our cool function
    uv.x = warp(uv.x);
    uv.y = warp(uv.y);
    
    // return the color from the texture with the warped uv
	gl_FragColor = texture2D(uTex0, uv);
}

// float uPower = 0.2;
// float uSpeed = 5.0;
// float uFrequency = 5.0;

// vec2 Distort(vec2 p, float power, float speed, float freq)
// {
//     float theta  = atan(p.y, p.x);
//     float radius = length(p);
//     radius = pow(radius, power*sin(radius*freq-uTime*speed)+1.0);
//     p.x = radius * cos(theta);
//     p.y = radius * sin(theta);
//     return 0.5 * (p + 1.0);
// }

// void main()
// {
//   vec2 xy = 2.0 * vTexCoord.xy/uRes.xy - 1.0;
//   vec2 uvt;
//   float d = length(xy);

//   //distance of distortion
//   if (d < 1.0 && uPower != 0.0)
//   {
//     //if power is 0, then don't call the distortion function since there's no reason to do it :)
//     uvt = Distort(xy, uPower, uSpeed, uFrequency);
//   }
//   else
//   {
//     uvt = vTexCoord.xy / uRes.xy;
//   }
//   vec4 c = texture2D(uTex0, uvt);
//   gl_FragColor = texture2D(uTex0, vTexCoord.xy / uRes.xy);
// }