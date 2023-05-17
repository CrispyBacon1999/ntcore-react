namespace Units {
    export function inchesToMeters(inches: number) {
        return inches * 0.0254;
    }

    export function metersToInches(meters: number) {
        return meters / 0.0254;
    }

    export function feetToMeters(feet: number) {
        return feet * 0.3048;
    }

    export function metersToFeet(meters: number) {
        return meters / 0.3048;
    }

    export function degreesToRadians(degrees: number): number {
        return (degrees * Math.PI) / 180;
    }

    export function radiansToDegrees(radians: number): number {
        return (radians * 180) / Math.PI;
    }
}

export default Units;
