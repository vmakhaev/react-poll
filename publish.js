import ghpages from 'gh-pages';
import path from 'path';

ghpages.publish(path.join(__dirname, 'dist'), function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log('published');
  }
});
