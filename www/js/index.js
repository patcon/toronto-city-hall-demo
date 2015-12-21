/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.hideSplash();
        app.createDemoNotification();
        app.fetchData();
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    hideSplash: function() {
      navigator.splashscreen.hide();
    },

    fetchData: function() {
      var path = window.location.href.replace('index.html', '');
      var request = pegasus(path + 'data.json');
      request.then(
        function (data, xhr) {
          app.processData(data);
        },
        function (data, xhr) {
          console.error(data, xhr.status);
        }
      );
    },

    createDemoNotification: function() {
      cordova.plugins.notification.local.schedule({
          id: 1,
          icon: 'res://icon',
          // See: http://androiddrawables.com
          // Most icons with 'ic' prefix work.
          text: 'Click to start demo',
          at: new Date(),
          ongoing: true,
      });
    },

    processData: function(data) {
      app.setupCards(data);

      cordova.plugins.notification.local.on("click", function (notification) {

        if (notification.id == 1) {
          app.scheduleDelayed(data);
        };
      });
    },

    scheduleDelayed: function (data) {
      var now = new Date().getTime(),
          _5_sec_from_now = new Date(now + 5 * 1000);

      cordova.plugins.notification.local.schedule({
          id: 2,
          icon: 'res://icon',
          title: data.upcoming.count + ' upcoming votes',
          text: 'City Council',
          at: _5_sec_from_now,
      });
    },

    setupCards: function (data) {
      var stack = gajus.Swing.Stack();

      data.upcoming.items.forEach(function(item) {
        var node = document.createElement('li');
        node.classList.add('in-deck');
        var textnode = document.createTextNode(item.identifier);
        node.appendChild(textnode);
        document.getElementById('stack').appendChild(node);
      });

      [].forEach.call(document.querySelectorAll('#stack li'), function (targetElement) {
          stack.createCard(targetElement);
          targetElement.classList.add('in-deck');
      });

      stack.on('throwout', function (e) {
        e.target.classList.remove('in-deck');
        console.log('Card has been throw out of the stack.');
        console.log('Throw direction: ' + (e.throwDirection == -1 ? 'left' : 'right'));
      });
    }

};

app.initialize();
