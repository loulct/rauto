precision mediump float;

#define PI 3.14159265359

uniform float iTime;
uniform vec2 iResolution;
uniform float u_spinRotation;
uniform float u_spinSpeed;
uniform vec2 u_offset;
uniform vec4 u_color1;
uniform vec4 u_color2;
uniform vec4 u_color3;
uniform float u_contrast;
uniform float u_lighting;
uniform float u_spinAmount;
uniform float u_pixelFilter;
uniform float u_spinEase;
uniform float u_isRotate;

varying vec2 vUv;

vec4 effect(vec2 screenSize, vec2 screen_coords) {
    float pixel_size = length(screenSize.xy) / u_pixelFilter;
    vec2 uv = (floor(screen_coords.xy * (1.0 / pixel_size)) * pixel_size - 0.5 * screenSize.xy) / length(screenSize.xy) - u_offset;
    float uv_len = length(uv);

    float speed = (u_spinRotation * u_spinEase * 0.2);
    if(u_isRotate > 0.5) {
        speed = iTime * speed;
    }
    speed += 302.2;

    float new_pixel_angle = atan(uv.y, uv.x) + speed - u_spinEase * 20.0 * (1.0 * u_spinAmount * uv_len + (1.0 - 1.0 * u_spinAmount));
    vec2 mid = (screenSize.xy / length(screenSize.xy)) / 2.0;
    uv = (vec2((uv_len * cos(new_pixel_angle) + mid.x), (uv_len * sin(new_pixel_angle) + mid.y)) - mid);

    uv *= 30.0;
    speed = iTime * (u_spinSpeed);
    vec2 uv2 = vec2(uv.x + uv.y);

    for(int i = 0; i < 5; i++) {
        uv2 += sin(max(uv.x, uv.y)) + uv;
        uv += 0.5 * vec2(cos(5.1123314 + 0.353 * uv2.y + speed * 0.131121), sin(uv2.x - 0.113 * speed));
        uv -= 1.0 * cos(uv.x + uv.y) - 1.0 * sin(uv.x * 0.711 - uv.y);
    }

    float contrast_mod = (0.25 * u_contrast + 0.5 * u_spinAmount + 1.2);
    float paint_res = min(2.0, max(0.0, length(uv) * (0.035) * contrast_mod));
    float c1p = max(0.0, 1.0 - contrast_mod * abs(1.0 - paint_res));
    float c2p = max(0.0, 1.0 - contrast_mod * abs(paint_res));
    float c3p = 1.0 - min(1.0, c1p + c2p);
    float light = (u_lighting - 0.2) * max(c1p * 5.0 - 4.0, 0.0) + u_lighting * max(c2p * 5.0 - 4.0, 0.0);

    return (0.3 / u_contrast) * u_color1 + (1.0 - 0.3 / u_contrast) * (u_color1 * c1p + u_color2 * c2p + vec4(c3p * u_color3.rgb, c3p * u_color1.a)) + vec4(light, light, light, 0.0);
}

void main() {
    vec2 uv = vUv * iResolution.xy;
    gl_FragColor = effect(iResolution.xy, uv);
}