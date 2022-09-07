import { connect, useSelector } from "react-redux";

const Notification = (props) => {
    let notification = useSelector((state) => state.notification);

    let style = {
        border: "solid",
        padding: 10,
        borderWidth: 1,
    };
    return (
        notification.notification && (
            <div style={style}>{notification.notification}</div>
        )
    );
};

const ConnectedNotification = connect(null, null)(Notification)
export default ConnectedNotification;
