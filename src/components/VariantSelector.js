import React from 'react';

class VariantSelector extends React.Component {
    render() {
        return (
            <div>
                <label onChange={null}>
                    {this.props.option.name}
                    <select
                        className="Product__option"
                        name={this.props.option.name}
                        key={this.props.option.name}
                        onChange={this.props.handleOptionChange}
                    >
                        {this.props.option.values.map((value) => {
                            return (
                                <option value={value} key={`${this.props.option.name}-${value}`}>{`${value}`}</option>
                            )
                        })}
                    </select>
                </label>
            </div>
        );
    }
}

export default VariantSelector;