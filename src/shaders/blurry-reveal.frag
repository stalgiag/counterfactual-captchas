#ifdef GL_ES
precision mediump float;
#endif
varying vec2 vTexCoord;

float RADIUS	= 100.0;
float BLUR	= 200.0;
float SPEED   = 2.0;

uniform sampler2D uTex0;
uniform vec2 location;
uniform float uTime;

void main(){
    vec2 uv = vTexCoord.xy;
    vec4 pic = texture2D(uTex0, vec2(uv.x, uv.y));
    
    vec2 center = location;
    float d = distance(gl_FragCoord.xy, center);
    float intensity = max((d - RADIUS) / (2.0 + BLUR * (1.0 + sin(uTime*SPEED))), 0.0);
    
	gl_FragColor = vec4(intensity + pic.r, intensity + pic.g, intensity + pic.b, 1.0);
}