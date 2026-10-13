export const ORBIT_COUNT = 5

// Both render passes receive the same circles. A delayed sample gives the dust
// a trailing, damped return instead of snapping back when a ring moves away.
export function updateSphereOrbits(time: number, frames: Float32Array, depths: Float32Array) {
    for (let sample = 0; sample < 2; sample++) {
        const t = time - sample * 0.65
        for (let i = 0; i < ORBIT_COUNT; i++) {
            const index = sample * ORBIT_COUNT + i
            const angle = i * 1.24 + t * (0.075 + i * 0.012)
            const tilt = 0.30 + 0.18 * Math.sin(t * 0.23 + i * 1.7)
            // The rings breathe towards and away from the one-unit sphere.
            const radius = 1.22 + i * 0.035 + 0.16 * Math.sin(t * 0.42 + i * 1.3)
            frames[index * 4] = Math.cos(angle)
            frames[index * 4 + 1] = Math.sin(angle)
            frames[index * 4 + 2] = tilt
            frames[index * 4 + 3] = radius
            depths[index] = Math.sqrt(1 - tilt * tilt)
        }
    }
}
