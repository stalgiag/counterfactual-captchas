#ifdef GL_ES
precision mediump float;
#endif
varying vec2 vTexCoord;

uniform float uTime;
uniform sampler2D uTex0;

float v = 0.002;
float amt = 10.0;

float warp( float a )
{
    float timeMod = uTime + a;
    return a + sin( timeMod * amt ) * v;
}

void main()
{
    vec2 uv = vTexCoord.xy;
    uv.x = warp(uv.x);
    uv.y = warp(uv.y);
    
	gl_FragColor = texture2D(uTex0, uv);
}