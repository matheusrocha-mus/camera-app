import React, {useRef, useEffect, useState} from "react";

function App() {
	const videoRef = useRef(null);
	const photoRef = useRef(null);

	const [hasPhoto, setHasPhoto] = useState(false);

	const getVideo = () => {
		navigator.mediaDevices.getUserMedia({ video: { width: 1920, height: 1080 }})
		.then(stream => {
			let video = videoRef.current;
			video.srcObject = stream;
			video.play();
		})
		.catch(err => {
			console.error(err);
		})
	}

	const takePhoto = () => {
		const width = 414;
		const height = width / (16/9);

		let video = videoRef.current;
		let photo = photoRef.current;

		photo.width = width;
		photo.height = height;

		let ctx = photo.getContext('2d');
		ctx.drawImage(video, 0, 0, width, height);
		setHasPhoto(true);
	}

	const closePhoto = () => {
		let photo = photoRef.current;
		let ctx = phptp.getContext('2d');

		ctx.clearReact(0, 0, photo.width, photo.height);

		setHasPhoto(false);
	}

	useEffect(() => {
		getVideo();
	}, [videoRef]);

	return (
		<div className="App">
			<div className="camera">
				<video ref={videoRef}></video>
				<button onClick={takePhoto}>
					<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
						<path d="M480-280q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm0 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
					</svg>
				</button>
			</div>
			<div className={'result ' + (hasPhoto ? 'hasPhoto' : '')}>
				<canvas ref={photoRef}></canvas>
				<button onClick={closePhoto}>
					<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
						<path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
					</svg>
				</button>
			</div>
		</div>
	);
}

export default App;