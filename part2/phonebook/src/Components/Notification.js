const Notification = ({ data }) => {
    if (data === null) { return null }
    if (data.type === "notification") { return <p className="notification">{data.message}</p> }
    if (data.type === "error") { return <p className="error">{data.message}</p> }
}

export default Notification