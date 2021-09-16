#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;

uniform vec2 uRes;
uniform sampler2D uTex0;


void main()
{
	vec2 uv = gl_FragCoord.xy / uRes.xy;
	vec4 tc = texture2D(uTex0, uv).xyzw;
	gl_FragColor =  tc;
}