import {Namer} from '@parcel/plugin';
import {Asset} from '@parcel/types';

export default new Namer({
  name({bundle}) {
    if (bundle.type === 'json') {
      let filePath = (bundle.getMainEntry() as Asset).filePath;
			if (filePath.indexOf('-manifest.json') >= 0) {
				return "manifest.json";
			}
    }

    // Allow the next namer to handle this bundle.
    return null;
  }
});
