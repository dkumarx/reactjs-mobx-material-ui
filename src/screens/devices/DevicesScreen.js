import React from "react";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { devicesStore } from "../../stores/DevicesStore";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Container from "@material-ui/core/Container";
import Grid from '@material-ui/core/Grid';

class DevicesScreen extends React.Component {
  constructor(Props){
      super(Props);
      this.timer = null;
      this.data = null;
  }

  async componentDidMount() {
    await devicesStore.getDevicesAsync();
  }

  componentWillUnmount(){
    clearTimeout(this.timer);
  }
  
  render() {    
    this.data = devicesStore.deviceData["devices"];
    this.data = toJS(this.data);
    this.timer = setTimeout(async () => {
      await devicesStore.getDevicesAsync();
     }, 5000);
    
    const _useStyle = this.useStyles;
    return (
      <div>
        
        {this.data ? 
        <Container style={{
            position: "relative", 
            display: "flex", 
            flexDirection: "column", 
            alignItems:"center", 
            textAlign: "center", 
            justifyContent: "center",
            paddingTop: 40
          }}>
          <Header />
          <Grid container style={{ backgroundColor: "#FF7043",  
            height: 500,
            maxWidth: 600,
            textAlign: "center", 
            justifyContent: "center" }}>
            <Grid item xs={12} style={{position: "absolute", top: "45%", left: "45%", width: "90px", height: "90px", color: "#fff", textTransform: "uppercase"}}>
              <span style={{display: "block", fontSize: 32}}>{this.data["length"]}</span>
              <span style={{display: "block", fontSize: 14}}>Devices online</span>
            </Grid>
            <Grid item xs={12} style={{position: "relative",
                height: "90%",
                width: "80%",
                marginLeft: "35px",
                marginTop: "35px"}}>
              {this.data.map((i, key) => {
                let topPos = Math.floor(Math.random() * (this.data.length * 5));
                let leftPos = Math.floor(Math.random() * (this.data.length * 10));
                if(topPos < 35 || topPos > 50) {
                  topPos = topPos > 90 ? Math.round(topPos/2)+10 : topPos;
                } else {
                  topPos =  30
                }
                
                if(leftPos < 40 || leftPos > 60) {
                  leftPos = leftPos > 90 ? Math.round(leftPos/2)+10 : leftPos
                } else {
                  leftPos = 55
                }

                return(<><div key={`d_${topPos}`} style= {{position: "absolute", borderColor: "black", borderWidth:1, left: `${leftPos}%` , top: `${topPos}%`, backgroundColor: "white", width: 50, height: 50, borderRadius: 50}}></div></>)
              })}</Grid>
          </Grid>
          <Footer />
        </Container> : <div>Loading....</div>}
      </div>
    );
  }
}

export default observer(DevicesScreen);