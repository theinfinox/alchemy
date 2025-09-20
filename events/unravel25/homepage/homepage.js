  // Select frames 2, 3, 4
    const frames = Array.from(document.querySelectorAll('.pure-frame')).slice(1, 5);

    function handleMouseMove(e) {
        console.log('handleMouseMove');
        const { innerWidth, innerHeight } = window;
        console.log(`innerWidth=${innerWidth}, innerHeight=${innerHeight}`);
        // Normalize cursor position to [-1, 1]
        const x = (e.clientX / innerWidth) * 2 - 1;
        const y = (e.clientY / innerHeight) * 2 - 1;

        console.log(`normalized pos: x=${x}, y=${y}`);

        frames.forEach((frame, i) => {
            console.log(`processing frame ${i+1}`);
            // Layer multiplier: frame2=1, frame3=2, frame4=3
            const layer = i + 1;
            console.log(`layer=${layer}`);
            // Tilt effect: closest edge moves less, farthest more
            // X controls left/right tilt, Y controls up/down tilt
            // Increase effect for deeper layers
            const tiltX = x * 5 * layer; // left/right
            const tiltY = y * 10 * layer; // up/down
            console.log(`tiltX=${tiltX}, tiltY=${tiltY}`);
            // Simulate tile: farthest edge moves more upwards
            frame.style.transform = `scale(${1.3 - layer * 0.05}) rotate(${layer * x * 1}deg) translate(${tiltX}px, ${tiltY}px)`;
        });
    }

    window.addEventListener('mousemove', handleMouseMove);