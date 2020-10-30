import React from "react";
import TextField from '@material-ui/core/TextField';

type Props = {
    handleInputChange: any;
}

const Search: React.FC<Props> = ({
    handleInputChange,
}) => {

    return (
        <TextField id="standard-search" label="search" type="search" name="search" variant="outlined" onChange={handleInputChange} />
    )

}

export default Search;