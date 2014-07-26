(function(){

	var Post = Backbone.Model.extend({
		initialize: function(){
			var d = (new Date()).toDateString().substring(3, 10);
			this.set('date', d);
		},
		defaults: {
			jobTitle: "",
			date: "",
			companyName: "",
			site: "",
			description: "",
			requirements: "",
			location: "",
			aboutUs: "",
			apply: ""
		}
	});
	
	var createPostView = Backbone.View.extend({
		model: Post,
		tagName: "section",
		id: "createPost",
		className: "animated fadeInDown",
		template: _.template($("#tplCreatePost").html()),
		render: function(){
			this.$el.html(this.template(this.model.toJSON() ));
			return this;
		},
		events: {
			"click #post" : function(e){
				e.preventDefault();
				var jobTitle = $('#jobTitle').html();
				var companyName = $('#companyName').html();
				var site = $('#site').html();
				var description = $('#description').html();
				var requirements = $('#requirements').html();		
				var location = $('#location').html();						
				var aboutUs = $('#aboutUs').html();
				var applyJob = $('#applyJob').html();												
				
				this.model.set('jobTitle', jobTitle);
				this.model.set('companyName', companyName);
				this.model.set('site', site);
				this.model.set('description', description);
				this.model.set('requirements', requirements);
				this.model.set('location', location);
				this.model.set('aboutUs', aboutUs);	
				this.model.set('applyJob', applyJob);							
														
				if(!jobTitle){
					$('#jobTitle').toggleClass("animated shake");
					
				} else {
					postsCollection.add(this.model, {at: 0});
					jobApp.navigate("mainView", {trigger: true});
				}
			}
		}
	});
	
	var PostView = Backbone.View.extend({
		model: Post,
		tagName: "section",
		className: "singlePost animated fadeInDown",
		template: _.template($("#tplPost").html()),
		render: function(){
			this.$el.html(this.template(this.model.toJSON() ));
			return this;
		},
		events: {
			"click" : function(){
				var urlPath = 'postView/' + this.model.get('jobTitle');
				jobApp.navigate(urlPath, {trigger: true});				
			}
		}
	});
	
	var PostViewFull = Backbone.View.extend({
		model: Post,
		tagName: "section",
		id: "fullViewPost",
		className: "animated fadeInDown",
		template: _.template($("#tplPostFull").html()),
		render: function(){
			this.$el.html(this.template(this.model.toJSON() ));
			return this;
		}
	});
	
	var PostCollection = Backbone.Collection.extend({
		model: Post
	});
	
	
	var PostViewCollection = Backbone.View.extend({
		el:"main",
		initialize: function(posts){
			this.collection = postsCollection;
			this.render();
		},
		render: function(){
			this.collection.each(function(item){
				this.renderPost(item);
			}, this);
		},
		renderPost: function(item){
			var postView = new PostView({
				model: item
			});
			this.$el.append(postView.render().el);
		}
			
		});
	
	
	var Router = Backbone.Router.extend({
		routes: {
			"mainView" : "mainView",
			"createPost" : "createPost",
			"postView/:jobTitle" : "postView"
		},
		mainView: function(){
			$('main').empty();
			$('main section').html(new PostViewCollection(postsCollection));
			$('header .arrow').removeClass("show");
		},
		createPost: function(){
			$('main').empty().html(new createPostView({model:new Post()}).render().el);
			$('header .arrow').addClass("show");			
		},
		postView: function(jobTitle){
			var selectedPost = postsCollection.find(function(post){
				return post.get('jobTitle') === jobTitle;});
			$('main').empty().html(new PostViewFull({model: selectedPost}).render().el);
			$('header .arrow').addClass("show");
		}	
		
	});
	
	var postsCollection = new PostCollection([
	{jobTitle:"ux designer", companyName: "lareet", site: "www.lareet.com", description:"It`s all about love. Love for your family, for your friends, for all the people that will use what you design. From paper sketches to polished HTML/CSS files you will have an important role in the development direction of our applications.", requirements: "- know your HTML/CSS <br> - good knowledge of design principles <br> - good communication skills", location: "remote or Timisoara", aboutUs: "We are a small company based in Timisoara, there are four people on our team with you we will become a quintet. An awesome quintet.", apply: "job@lareet.com"},
	{jobTitle:"frontend developer", companyName: "vaxau", site: "www.vaxau.com", description:"This is a full-time position for of period of one year. You can build smooth interfaces with tools like backbone, angular, HTML5/CSS3. Mainly we create websites and applications for the medical industry.", requirements:"-expert in Backbone.js <br> -handlebars and other templating frameworks <br> HTML5/CSS3 with SASS and compass",  location: "Berlin", aboutUs: "We are in business from 2003. By making our job well we help people to get to information easier from the medical sector.", apply: "jobs@vaxau.com"},
		{jobTitle:"iOS Developer", companyName: "fullfrog", site: "www.fullfrog.com", description:"We are hiring a Senior iOS Developer that has experience working on large applications.", requirements:"- knowledge of MVC architecture <br> - expert in iOS SDK <br> - good communication skills <br> - unit testing",  location: "San Francisco", aboutUs: "We value diversity in the workplace and like to work together. Our main office is in San Francisco but we have people all over the world working remotely", apply: "jobs@fullfrog.com"}
	]);
	
	
	var jobApp = new Router();
	Backbone.history.start();
	
	jobApp.navigate("mainView", {trigger: true});

})();




