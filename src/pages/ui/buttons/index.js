/**
 * +----------------------------------------------------------------------
 * | index
 * +----------------------------------------------------------------------
 * | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */
import React,{Component} from 'react';
import {Row,Col,Button} from "antd";

class Buttons extends Component{

    render() {
        return (
            <div style={{color:'red'}}>
              <Row>
                  <Col>
                      <Button type="primary">primary</Button>
                  </Col>
              </Row>
            </div>
        );
    }

}
export default Buttons;
