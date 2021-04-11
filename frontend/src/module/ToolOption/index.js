import React from 'react';
import Chip from '@material-ui/core/Chip';
import {useState} from 'react';

const ToolOption = () => {
    const [Default,SetDefault] = useState([
        {
            'key':'0 đến 499k',
            'var':'outlined'
        },
        {
            'key':'500k đến 999k',
            'var':'outlined'
        },
        {
            'key':'1.000k đến 4.999k',
            'var':'outlined'
        },
        {
            'key':'5.000k đến 9.999k',
            'var':'outlined'
        },
        {
            'key':'10.000k đến 20.000k',
            'var':'outlined'
        }
    ]);
    const [Tool,setTool] = useState();

    const isDefault = (e) => {
        var temp = e.target.innerText;
        var result = Default.find(name => name.key == temp)
        var IndexResult = Default.findIndex((a) => {return a.key == temp})
        let temp_state = [...Default];

        if(result.var == 'outlined'){
            temp_state[IndexResult] = {'key':temp,'var':'default'}
        } else {
            temp_state[IndexResult] = {'key':temp,'var':'outlined'}
        }

        SetDefault(...[temp_state])
    }
    const handleAddTool = (e) => {
        
    }
    return (
        <>
            <div >
                <div className='select-gender option'>
                    <div className="title-option">Giới tính</div>
                    
                    <div className="radio">
                        <label>
                            <input 
                                type="radio" 
                                name="gender"
                                id="input"
                                checked="checked"
                            />
                            Nam
                        </label>
                        <label>
                            <input 
                                type="radio"
                                name="gender"
                                id="input"
                            />
                            Nữ
                        </label>
                    </div>
                </div>

                <div className='select-price option'>
                    <div className="title-option">Giá tiền</div>
                    <div className="list-option-price">
                        {
                            Default.map(item => {
                                return <Chip 
                                        color="primary"
                                        variant= {item.var}
                                        label={item.key}
                                        onClick={isDefault}
                                    />
                            })
                        }
                    </div>
     
                    <label for="">Từ</label>
                    <input type="number" min="0" id="from" placeholder="Nhập giá tiền" step="10000"/>
                    <label for="">Đến</label>
                    <input type="number" min="0" id="to" placeholder="Nhập giá tiền" step="10000"/>
                   
                </div>
                
                <div className='select-prioritize option'>
                    <div className="title-option">Ưu tiên</div>
                    
                    <div className="radio">
                        <label>
                            <input type="radio" name="prioritize" id="input" value="" />
                            Giá giảm dần
                        </label>
                        <label>
                            <input type="radio" name="prioritize" id="input" value="" />
                            Giá tăng dần
                        </label>
                        <label>
                            <input type="radio" name="prioritize" id="input" value="" />
                            Từ A đến Z
                        </label>
                        <label>
                            <input type="radio" name="prioritize" id="input" value="" />
                            Từ Z đến A
                        </label>
                        <label>
                            <input type="radio" name="prioritize" id="input" value="" />
                            Hàng mới
                        </label>
                    </div>
                </div>
                <button className="btn btn-primary">Áp dụng</button>
            </div>
        </>
    );
};

export default ToolOption;