import * as React from 'react';
import {MDBContainer, MDBFooter } from "mdbreact";
class Footer extends React.Component{
  
public render() {
    return (
        <MDBFooter color="white"className="font-small pt-4 mt-4">
            <div className="text-center py-3 Darkcolor">
        <MDBContainer>
          All Rights Reserved VSSB 2018
        </MDBContainer>
      </div>
    </MDBFooter>
       )
}
}
export default Footer