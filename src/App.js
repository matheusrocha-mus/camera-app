import React from "react";
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

let photo = [];

function App (props) {
	const apiURL = 'https://camera-app-server.matheusrocha-mu.repl.co/photo';

	async function fetchPhoto() {
		try {
			const response = await fetch(`${apiURL}`);
			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error fetching JSON::', error);
		}
	}

	async function handleTakePhoto (dataUri) {
        try {
            const response = await fetch(`${apiURL}/1`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ dataUri }),
            });

            if (response.ok) {
                console.log('Successfully added new photo to database');
                fetchPhoto().then((data) => {
                    photo = data;
                });
            } else {
                console.error('Error while adding new photo:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching JSON:', error);
        }
	}

	document.addEventListener("DOMContentLoaded", () => {
		fetchPhoto().then((data) => {
			photo = data;
		});
	});

	return (
		<Camera
			onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
		/>
	);
}

export default App;