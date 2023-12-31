
import Slider from '../Components/Carousel/Carousel';
import '../Pages/Fiche.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import datas from '../Components/Gallery/datas';
import Collapse from "../Components/Collapse/Collapse";
import greyStar from '../Assets/grey_star.png';
import redStar from '../Assets/red_star.png';



export default function Fiche() {

	const [imageSlider, setImageSlider] = useState([0]);
	const idUrlLocation = useParams("id").id;
	const dataCurrentLocation = datas.filter(data => data.id === idUrlLocation);
	const navigate = useNavigate();

	useEffect(() => {
		if (!datas.length || !dataCurrentLocation.length) {
			navigate("/Erreur404");
		} else {
			setImageSlider(dataCurrentLocation[0].pictures);
		}
	}, [navigate, dataCurrentLocation, idUrlLocation]);

	const name = dataCurrentLocation.length ? dataCurrentLocation[0].host.name.split(' ') : ["", ""];
	const rating = dataCurrentLocation.length ? dataCurrentLocation[0].rating : ["", ""];
	const description = dataCurrentLocation.length ? dataCurrentLocation[0].description : ["", ""];
	const equipments = dataCurrentLocation.length ? dataCurrentLocation[0].equipments : ["", ""];

	return (
		<>
			<Slider imageSlider={imageSlider} />
			<main className="location">
				<div className="location_content">
					<div className="infos">
						<h1>{dataCurrentLocation.length ? dataCurrentLocation[0].title : ["", ""]}</h1>
						<p>{dataCurrentLocation.length ? dataCurrentLocation[0].location : ["", ""]}</p>
						<div className='buttonBox'>
							{dataCurrentLocation.length ? dataCurrentLocation[0].tags : ["", ""].map((tag, index) => {
								return (
									<button key={index}>{tag}</button>
								)
							})}
						</div>
					</div>
					<div className="content_host">
						<div className='host_nameBox'>
							<div className='host_name'>
								<span>{name[0]}</span>
								<span>{name[1]}</span>
							</div>
							<img className='host_picture' src={dataCurrentLocation.length ? dataCurrentLocation[0].host.picture : ["", ""]} alt="host of this accomodation" />
						</div>

						<div className="stars">
							{[...Array(5)].map((star, index) => {
								const ratingValue = index + 1;
								return (
									<img className='stars_count' key={index} src={ratingValue <= rating ? redStar : greyStar} alt="star" />
								)
							})}
						</div>
					</div>
				</div>
				<div className="collapseBox">
					<div className="collapse_item">
						<Collapse title={'Description'} content={description} />
					</div>
					<div className="collapse_item">
						<Collapse title={'Équipements'} content={equipments} />
					</div>
				</div>
			</main>
		</>
	);
};
