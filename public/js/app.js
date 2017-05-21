
new Vue({
	el: '#events',
	data: {
		event: {name: '', description: '', date: ''},
		events: []
	},
	mounted: function() {
		this.fetchEvents();
	},
	methods: {
		fetchEvents: function() {
			this.$http.get('/api/events')
				.then(function(res) {
					this.$set(this, 'events', res.data);
					console.log(res.data);
				},

				function(res) {
					console.log('Error: ' + res.data)
				})
		},

		addEvent: function() {
			this.$http.post('/api/events', this.event)
				.then(function(res) {
					this.event = {name: '', description: '', date: ''}
					this.$set(this, 'events', res.data);
					console.log(res.data)
				},
				function(res) {
					console.log('Error: ' + res.data)
				})
		},

		deleteEvent: function(id, index) {
			if(confirm('Are you sure?')) {
				this.$http.delete('/api/events/' + id)
					.then(function(res) {
						this.$set(this, 'events', res.data);
						console.log(res.data)
					},
					function(res) {
						console.log('Error: ' + res.data)
					})
			}
		},

		parseDate: function(date) {
			return moment(date).format('dddd, Do MMMM YYYY')
		}
	}
})