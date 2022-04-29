var form = document.getElementById("newPerson");
var inputName = document.getElementById("name");
var inputEmail = document.getElementById("email");
var inputMobile = document.getElementById("mobile");
var inputLandline = document.getElementById("landline");
var inputWebsite = document.getElementById("website");
var inputAddress = document.getElementById("address");
var contactsList = document.getElementById("contactList");
var contactDetails = document.getElementById("details");
function addContact(event) {
    form.classList.toggle("display-none");
    var butn = document.getElementById('save-btn');
    butn.innerText = "Add";
    form.reset();
    butn.classList.add('add-button');
    butn.classList.remove('update-button');
    event.preventDefault();
}
var allContactDetailsList = [
    {
        name: "Praveen Kumar",
        email: "praveen@anonymous.com",
        mobile: "923 345 2342",
        landline: "40 30 1231211",
        website: "https://www.anonymous.com",
        address: "123 now here\nSome street\nFaridabad, Haryana 121001"
    },
    {
        name: "Pankaj Sharma",
        email: "pankaj@anonymous.com",
        mobile: "929 292 9292",
        landline: "40 30 1231211",
        website: "https://www.anonymous.com",
        address: "123 now here\nSome street\nFaridabad, Haryana 121001"
    },
    {
        name: "Rimika Aggarwal",
        email: "rimika@anonymous.com",
        mobile: "936 272 7277",
        landline: "40 30 1231211",
        website: "https://www.anonymous.com",
        address: "123 now here\nSome street\nFaridabad, Haryana 121001"
    },
    {
        name: "Vijay Thalapathy",
        email: "vijay@anonymous.com",
        mobile: "999 995 5056",
        landline: "40 30 1231211",
        website: "https://www.anonymous.com",
        address: "123 now here\nSome street\nFaridabad, Haryana 121001"
    }
];
var ShowAllContacts = /** @class */ (function () {
    function ShowAllContacts() {
    }
    ShowAllContacts.prototype.showContacts = function () {
        for (var i = 0; i < allContactDetailsList.length; i++) {
            var d = document.createElement('div');
            d.className = "contact";
            d.innerHTML = "<p class=\"name\">" + allContactDetailsList[i].name + "</p>" +
                "<p class=\"email\">" + allContactDetailsList[i].email + "</p>" +
                "<p class=\"mobile\">" + "+91 " + allContactDetailsList[i].mobile + "</p>";
            contactsList.appendChild(d);
        }
    };
    return ShowAllContacts;
}());
var showContactList = new ShowAllContacts();
showContactList.showContacts();
var Contact = /** @class */ (function () {
    function Contact() {
        this.name = inputName.value;
        this.email = inputEmail.value;
        this.mobile = inputMobile.value.slice(0, 3) + " " + inputMobile.value.slice(3, 6) + " " + inputMobile.value.slice(6);
        this.landline = inputLandline.value.slice(0, 2) + " " + inputLandline.value.slice(2, 4) + " " + inputLandline.value.slice(4);
        this.website = inputWebsite.value;
        this.address = inputAddress.value;
    }
    return Contact;
}());
var edit = false;
form.onsubmit = function (event) {
    var isValid = new Validation();
    if (isValid.formValid()) {
        var contact = new Contact();
        if (!edit) {
            allContactDetailsList.push(contact);
            var d = document.createElement('div');
            d.className = "contact";
            d.innerHTML = "<p class=\"name\">" + contact.name + "</p>" +
                "<p class=\"email\">" + contact.email + "</p>" +
                "<p class=\"mobile\">" + "+91 " + contact.mobile + "</p>";
            contactsList.appendChild(d);
        }
        else {
            allContactDetailsList[currentIndex].name = contact.name;
            allContactDetailsList[currentIndex].email = contact.email;
            allContactDetailsList[currentIndex].mobile = contact.mobile;
            allContactDetailsList[currentIndex].landline = contact.landline;
            allContactDetailsList[currentIndex].website = contact.website;
            allContactDetailsList[currentIndex].address = contact.address.replace(/[\n]+/gm, "<br>");
            contactsList.children[currentIndex].innerHTML = "<p class=\"name\">" + contact.name + "</p>" +
                "<p class=\"email\">" + contact.email + "</p>" +
                "<p class=\"mobile\">" + "+91 " + contact.mobile + "</p>";
            contactAllDetail(currentIndex);
        }
        event.preventDefault();
        form.reset();
        form.classList.add("display-none");
        edit = false;
    }
    else {
        event.preventDefault();
        alert("Invalid field entered");
    }
};
contactsList.children[0].classList.add("active-tab");
var contactAllDetail = function (index) {
    if (index === -1) {
        return contactDetails.innerHTML = "<div> No Contacts to Display </div>";
    }
    contactDetails.innerHTML =
        "<div class=\"d-flex justify-content-between align-items-baseline\">\n        <h4>" + allContactDetailsList[index].name + "</h4>\n        <div class=\"d-flex align-items-baseline\">\n          <div class=\"edit\"  onclick=\"editContactDetails()\">\n            <img src=\"../Images/edit1.jpg\" alt=\"\">\n            <span class=\"text-uppercase\">edit</span>\n          </div>\n          <div class=\"delete\"  onclick=\"deleteContact()\">\n            <img src=\"../Images/delete1.png\" alt=\"\">\n            <span class=\"text-uppercase\">delete</span>\n          </div>\n        </div>\n      </div>\n      <p>Email: " + allContactDetailsList[index].email + "</p>\n      <div class=\"contact-numbers\">\n        <p>Mobile: +91 " + allContactDetailsList[index].mobile + "</p>\n        <p>Landline: " + allContactDetailsList[index].landline + "</p>\n      </div>\n      <p>Website: " + allContactDetailsList[index].website + " </p>\n      <div class=\"row\">\n        <span class=\"col-2\" style=\"width: 50px;\">Address:</span>\n        <span class=\"col-6\">" + allContactDetailsList[index].address.replace(/[\n]+/gm, "<br>") + "</span>\n      </div>";
};
var currentIndex = 0;
contactsList.onclick = function (e) {
    var target = e.target;
    while (target.parentNode !== this) {
        target = target.parentNode;
        if (!target)
            return;
    }
    var index = [].indexOf.call(this.children, target);
    currentIndex = index;
    contactAllDetail(index);
    for (var i = 0; i < contactsList.children.length; i++) {
        if (i == index)
            contactsList.children[index].classList.add("active-tab");
        else
            contactsList.children[i].classList.remove("active-tab");
    }
};
function editContactDetails() {
    edit = true;
    var butn = document.getElementById('save-btn');
    inputName.value = allContactDetailsList[currentIndex].name;
    inputEmail.value = allContactDetailsList[currentIndex].email;
    inputMobile.value = parseInt(allContactDetailsList[currentIndex].mobile.split(" ").join(""));
    inputLandline.value = parseInt(allContactDetailsList[currentIndex].landline.split(" ").join(""));
    inputWebsite.value = allContactDetailsList[currentIndex].website;
    inputAddress.value = allContactDetailsList[currentIndex].address;
    form.classList.toggle("display-none");
    butn.innerText = "Update";
    butn.classList.add('update-button');
    butn.classList.remove('add-button');
}
function deleteContact() {
    if (!confirm("Are you sure you want to delete this?"))
        return;
    delete allContactDetailsList[currentIndex];
    contactsList.children[currentIndex].classList.remove("active-tab");
    allContactDetailsList = allContactDetailsList.filter(function (n) { return n; });
    contactsList.innerHTML = null;
    if (allContactDetailsList.length === 0) {
        return contactAllDetail(-1);
    }
    showContactList.showContacts();
    contactsList.children[0].classList.add("active-tab");
    contactAllDetail(0);
    currentIndex = 0;
}
var Validation = /** @class */ (function () {
    function Validation() {
    }
    Validation.prototype.formValid = function () {
        var nameValidation = contactNameValid();
        var emailValidation = contactEmailValid();
        var mobileValidation = contactMobileValid();
        var websiteValidation = contactWebsiteValid();
        if (nameValidation && emailValidation && mobileValidation && websiteValidation) {
            return true;
        }
        else {
            return false;
        }
    };
    return Validation;
}());
function contactNameValid() {
    if (inputName.value === "") {
        document.getElementById("nameMessage").innerText = "Name is required";
        return false;
    }
    else {
        document.getElementById("nameMessage").innerText = "";
        return true;
    }
}
function contactEmailValid() {
    var validMail = /^([a-z0-9_\._]+)@([a-z0-9])+.([a-z]+)(.[a-z]+)?$/;
    if (inputEmail.value === "") {
        document.getElementById("emailMessage").innerText = "Email is required";
        return false;
    }
    else if (!validMail.test(inputEmail.value)) {
        document.getElementById("emailMessage").innerText = "Please enter a valid email";
        return false;
    }
    else {
        document.getElementById("emailMessage").innerText = "";
        return true;
    }
}
function contactMobileValid() {
    var validMobile = /^\d{10}$/;
    if (inputMobile.value === "") {
        document.getElementById("mobileMessage").innerText = "Mobile No. is required";
        return false;
    }
    else if (!inputMobile.value.match(validMobile)) {
        document.getElementById("mobileMessage").innerText = "Enter a valid number";
        return false;
    }
    else {
        document.getElementById("mobileMessage").innerText = "";
        return true;
    }
}
function contactWebsiteValid() {
    var validUrl = /^((http(s?)):\/\/)?([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/g;
    if (inputWebsite.value === "") {
        document.getElementById("websiteMessage").innerText = "";
        return true;
    }
    else if (!inputWebsite.value.match(validUrl)) {
        document.getElementById("websiteMessage").innerText = "Please enter a valid site";
        return false;
    }
    else {
        document.getElementById("websiteMessage").innerText = "";
        return true;
    }
}
