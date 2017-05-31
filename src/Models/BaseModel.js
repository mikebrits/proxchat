import uuid from 'uuid';
class BaseModel {


    baseFields = {
        id: {type: 'string'},
        added_at: {type: 'date'},
        edited_at: {type: 'date'},
    };

    setRealm(realm){
        this.realm = realm;
    }

    create(fields) {
        this.realm.write(() => {
            this.realm.create(this.schema.name, {
                id: uuid.v4(),
                added_at : new Date(),
                edited_at : new Date(),
                ...fields
            });

        });
    }

    delete(id){
        this.realm.write(() => {
            this.realm.delete(
                this.realm.objects(this.schema.name).filtered(`id == "${id}"`)
            )
        })
    }

    clear() {
        this.realm.write(() => {
            this.realm.delete(this.realm.objects(this.schema.name));
        })
    }
}

export default BaseModel;