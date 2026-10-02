export const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;

    gl_Position =
      projectionMatrix *
      modelViewMatrix *
      vec4(position, 1.0);
  }
`;

export const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;

  varying vec2 vUv;

  void main() {

    // Center the UV coordinates
    vec2 uv = vUv - 0.5;

    // Correct for screen aspect ratio
    uv.x *= u_resolution.x / u_resolution.y;

    // Convert mouse position into a small movement
    vec2 mouse = u_mouse / u_resolution;
    vec2 mouseOffset = (mouse - 0.5) * 0.35;

    uv += mouseOffset;

    // Animated flowing waves
    float wave1 = sin(uv.x * 5.0 + u_time * 0.8);
    float wave2 = sin(uv.y * 6.0 - u_time * 0.6);
    float wave3 = sin((uv.x + uv.y) * 7.0 + u_time * 0.5);

    float pattern = (wave1 + wave2 + wave3) / 3.0;

    // Convert the wave into a smooth 0-1 value
    float glow = pattern * 0.5 + 0.5;

    // Custom purple / blue / cyan palette
    vec3 darkPurple = vec3(0.08, 0.01, 0.20);
    vec3 purple = vec3(0.45, 0.05, 0.75);
    vec3 cyan = vec3(0.02, 0.65, 0.80);

    // Blend the colors using the animated pattern
    vec3 color = mix(darkPurple, purple, glow);
    color = mix(color, cyan, glow * 0.45);

    // Add a soft center glow
    float centerGlow = 1.0 - smoothstep(
      0.0,
      0.9,
      length(uv)
    );

    color += vec3(0.08, 0.12, 0.20) * centerGlow;

    gl_FragColor = vec4(color, 1.0);
  }
`;