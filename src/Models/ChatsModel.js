import BaseModel from './BaseModel'


class ChatsModel extends BaseModel {
    constructor() {
        super();
        this.schema = {
            name: 'GalleryItem',
            primaryKey : 'id',
            properties: {
                ...this.baseFields,
                type: {type: 'string'},
            }
        }
    }

    // schema = {
    //
    //     id: PropTypes.number.isRequired,
    //     name: PropTypes.string,
    //     thumbnail: PropTypes.string,
    //     host: PropTypes.shape({
    //         id: PropTypes.number,
    //         name: PropTypes.string
    //     }),
    //     status: PropTypes.string,
    //     location: PropTypes.shape({
    //         latitude: PropTypes.number,
    //         longitude: PropTypes.number
    //     }),
    //     radius: PropTypes.number,
    //     score: PropTypes.number,
    //     users: PropTypes.arrayOf(PropTypes.shape({
    //         id: PropTypes.number,
    //         name: PropTypes.string,
    //     }))
    //
    // }

    details() {
        return {
            id: 999,
            name: 'Mike Brits',
        }
    }
}


export let Chat = new ChatsModel();