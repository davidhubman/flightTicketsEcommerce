import OneWayInfo from "./OneWayInfo";
import RoundtripInfo from "./RoundtripInfo";

export default function Ticketinfo(props) {
  return (
    <>
      {props.mode === "oneway" ? (
        <OneWayInfo {...props} />
      ) : (
        <RoundtripInfo {...props} />
      )}
    </>
  );
}
