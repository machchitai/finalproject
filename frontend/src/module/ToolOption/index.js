import React from 'react';
import Chip from '@material-ui/core/Chip';
import {useState} from 'react';

const ToolOption = () => {
    const [Default,SetDefault] = useState([
        {
            'key':'0 đến 99k',
            'var':'outlined'
        },
        {
            'key':'100k đến 199k',
            'var':'outlined'
        },
        {
            'key':'200k đến 299k',
            'var':'outlined'
        },
        {
            'key':'300k đến 399k',
            'var':'outlined'
        },
        {
            'key':'400k đến 799k',
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
                    
                    <div class="radio">
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
                    
                    <div class="radio">
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
                <button class="btn btn-primary">Áp dụng</button>
            </div>
        </>
    );
};

export default ToolOption;