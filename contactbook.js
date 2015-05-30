Contacts = new Mongo.Collection('contacts');

var checked = [];

if (Meteor.isClient) {
  
  // Contacts events
  Template.contacts.helpers({
    contacts: function() {
      var filter = {sort: {}};
      var query = Session.get('query');
      filter.sort[Session.get('sortby')] = 1;

      return Contacts.find({ name : new RegExp(query, 'i') }, filter);
    }
  });

  // New Contact Templates
  Template.new_contact.events({
    "submit .contactForm" : function(event) {
      
      Contacts.insert({
        name: event.target.name.value,
        number: event.target.number.value,
        email: event.target.email.value,
        address: event.target.address.value,
        createdAt: new Date()
      });

      event.target.name.value = "";
      event.target.number.value = "";
      event.target.email.value = "";
      event.target.address.value = "";
      
      $('#newContactModal').modal('toggle');
    }
  });

  Template.contacts.events({
    "click th": function(event){
      var order = $(event.target).text().toLowerCase();
      Session.set('sortby', order);
    },

    "click .delete": function () {
      $.each(checked, function(index,value) {
        Contacts.remove(value);
      }); 
    }

    "keyup .searchbox": function(event) {
      var query = event.target.value;
      Session.set('query', query);
    }
  });

  Template.contact.events({
    "click .toggle-checked": function () {
      var index = checked.indexOf(this._id);
      if (index > -1) {
        checked.splice(index, 1);
      }
      else {
        checked.push(this._id);
      }
    }
  });
}


