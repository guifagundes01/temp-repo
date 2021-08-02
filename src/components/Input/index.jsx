import './styles.css';

export const Input = ({searchValue, handleChange, filteredPosts}) => {
    
    return (
    <div>
        <input
            className="input"
            placeholder="Type your search"
            onChange={handleChange}
            value={searchValue}
            type="search"
        />

        <div>

        </div>

        <br /><br /><br />
    </div>
    )
}