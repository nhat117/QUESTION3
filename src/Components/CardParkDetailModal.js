const CardParkDetailModal = (props) => {
    return (
        // <!-- Button trigger modal -->
        <>
            {/* <!-- Modal --> */}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">{props.data.name}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="modal-body__content">
                                <span>Opening Status: {props.data.opening_status}</span>
                                <span>Contact: {props.data.contactNo}</span>
                                {props.data.openingHours ?
                                    props.data.openingHours[0]?.weekdays.map((item, index) => (
                                    <span key={index}>{item}</span>
                                    )):''
                                }
                            </div>


                        </div>
                        <div class="modal-footer">
                            <center>
                                <a href={`${props.data.website}`}
                                   className="text-muted text-link"
                                   center>{props.data.website === "" ? "Not Available" : "More Information"}
                                </a>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default CardParkDetailModal