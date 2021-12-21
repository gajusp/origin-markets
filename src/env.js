(function (window) {
  var apiBaseUrl = "http://localhost:3000/";

  window.__env = {
    apiBaseUrl: apiBaseUrl,

    tasksUrl: apiBaseUrl + "tasks",
  };
})(this);
