import React from "react";
import io from "socket.io-client";
import { Text, Card, Elevation, Spinner } from "@blueprintjs/core";

interface ApplicationState {
  radioInfo: any;
}

export class Application extends React.Component<{},ApplicationState> {

  private connection?: SocketIOClient.Socket;

  constructor(props: any) {
    super(props);
    this.state = { radioInfo: null };
  }

  componentDidMount() {
    this.connection = io.connect("http://localhost:3000");
    this.connection.on("info", (info: any) => {
      console.log(info);
      this.setState({ radioInfo: info });
    });
  }

  render() {
    if (this.state.radioInfo === null) return <Spinner/>
    return (
      <div style={{background: "#777", display: "flex", width: "100vw", height: "100vh", justifyContent: "center", alignItems: "center", paddingLeft: "20vw", paddingRight: "20vw"}}>
        {/* <p>{this.state.radioInfo !== null ? JSON.stringify() : "Loading"}</p> */}
        <Card style={{flex: 1, minHeight: 300}} elevation={Elevation.TWO}>
          <h2>Device View</h2>
          <Text>{this.state.radioInfo.ViewDescription.InfoArea1 && this.state.radioInfo.ViewDescription.InfoArea1._attributes.Text}</Text>
          <Text>{this.state.radioInfo.ViewDescription.InfoArea2 && this.state.radioInfo.ViewDescription.InfoArea2._attributes.Text}</Text>
          <Text>{this.state.radioInfo.ViewDescription.OverWrite && this.state.radioInfo.ViewDescription.OverWrite._attributes.Text}</Text>
        </Card>
        <Card style={{flex: 1, marginLeft: "5vw", minHeight: 300}} elevation={Elevation.TWO}>
          {
            this.state.radioInfo.ConvFrequency && 
            <div>
              <h3 style={{color: "red"}}>Scanning For Activity...</h3>
              <Text>Site: {this.state.radioInfo.System._attributes.Name}</Text>
              <Text>{this.state.radioInfo.ConvFrequency._attributes.Name}</Text>
            </div>
          }
          {
            this.state.radioInfo.Site &&
            <div>
              <h3 style={{color: "green"}}>Listening On</h3>
              <Text>{this.state.radioInfo.Site._attributes.Name}</Text>
              <Text>{this.state.radioInfo.SiteFrequency._attributes.Freq}</Text>
              <Text>{this.state.radioInfo.TGID._attributes.Name}</Text>
            </div>
          }
          {/* <Text>{this.state.radioInfo.Site && JSON.stringify(this.state.radioInfo.Site)}</Text> */}
          {/* <Text>{this.state.radioInfo.SiteFrequency && JSON.stringify(this.state.radioInfo.SiteFrequency)}</Text> */}
        </Card>
      </div>
    )
  }

}