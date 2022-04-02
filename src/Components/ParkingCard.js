// Render Parking Card

const ParkingCard = (props) => {

    return (
        <div className="card col-3">
            <div className="card-body">
                <h5 className="card-title">{props.data.name}</h5>
                <p className="card-text">{props.data.displayAddress}</p>
            </div>
            <div className="card-footer " style={{ height: "5rem", overflow: "hidden" }}>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                    onClick={() => {
                        props.addContent(props.data);
                    }}>
                    More Detail
                </button>

            </div>
        </div>
    )
}

export default ParkingCard