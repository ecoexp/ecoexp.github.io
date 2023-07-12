function generateUniqueId() {
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var id = '';
  for (var i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return 'ps_' + id;
}

var uniqueId = localStorage.getItem('pre_study_unique_id');
if (!uniqueId) {
  uniqueId = generateUniqueId();
  localStorage.setItem('pre_study_unique_id', uniqueId);
}
function delete_id(){
  localStorage.removeItem('pre_study_unique_id');
  const linkToOpen='https://ecoexp.github.io/'
  window.location.href = linkToOpen;

}

console.log(uniqueId);