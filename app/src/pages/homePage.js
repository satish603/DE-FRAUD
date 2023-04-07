import React from 'react'
// import './home.css'
import gif from '../static/images/homeGif.gif'
import { Card } from "react-bootstrap";
import '../static/css/home.css'
import jQuery from 'jquery';
import $ from "jquery";
import Carousel from 'react-bootstrap/Carousel';
import p1 from '../static/images/p1.jpg'
import p2 from '../static/images/p2.jpg'
import p3 from '../static/images/p3.jpg'


const Home = () => {

    (function ($) {
        $.fn.countTo = function (options) {
            options = options || {};

            return $(this).each(function () {
                // set options for current element
                var settings = $.extend({}, $.fn.countTo.defaults, {
                    from: $(this).data('from'),
                    to: $(this).data('to'),
                    speed: $(this).data('speed'),
                    refreshInterval: $(this).data('refresh-interval'),
                    decimals: $(this).data('decimals')
                }, options);

                // how many times to update the value, and how much to increment the value on each update
                var loops = Math.ceil(settings.speed / settings.refreshInterval),
                    increment = (settings.to - settings.from) / loops;

                // references & variables that will change with each update
                var self = this,
                    $self = $(this),
                    loopCount = 0,
                    value = settings.from,
                    data = $self.data('countTo') || {};

                $self.data('countTo', data);

                // if an existing interval can be found, clear it first
                if (data.interval) {
                    clearInterval(data.interval);
                }
                data.interval = setInterval(updateTimer, settings.refreshInterval);

                // initialize the element with the starting value
                render(value);

                function updateTimer() {
                    value += increment;
                    loopCount++;

                    render(value);

                    if (typeof (settings.onUpdate) == 'function') {
                        settings.onUpdate.call(self, value);
                    }

                    if (loopCount >= loops) {
                        // remove the interval
                        $self.removeData('countTo');
                        clearInterval(data.interval);
                        value = settings.to;

                        if (typeof (settings.onComplete) == 'function') {
                            settings.onComplete.call(self, value);
                        }
                    }
                }

                function render(value) {
                    var formattedValue = settings.formatter.call(self, value, settings);
                    $self.html(formattedValue);
                }
            });
        };

        $.fn.countTo.defaults = {
            from: 0,               // the number the element should start at
            to: 0,                 // the number the element should end at
            speed: 1000,           // how long it should take to count between the target numbers
            refreshInterval: 100,  // how often the element should be updated
            decimals: 0,           // the number of decimal places to show
            formatter: formatter,  // handler for formatting the value before rendering
            onUpdate: null,        // callback method for every time the element is updated
            onComplete: null       // callback method for when the element finishes updating
        };

        function formatter(value, settings) {
            return value.toFixed(settings.decimals);
        }
    }(jQuery));

    jQuery(function ($) {
        // custom formatting example
        $('.count-number').data('countToOptions', {
            formatter: function (value, options) {
                return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
            }
        });

        // start all the timers
        $('.timer').each(count);

        function count(options) {
            var $this = $(this);
            options = $.extend({}, options || {}, $this.data('countToOptions') || {});
            $this.countTo(options);
        }
    });


    return (
        <div className='home'>
            <div class="row">


                <div class="col-md-6 head-left">
                    <h1 class="hl-line">Add your innovations and secure them!</h1>
                    <a href="http://localhost:3000/add"><button type="button" class="btn btn-lg btn-dark download-btn"
                        

                    > Add product</button></a>
                    
                    <a href="http://localhost:3000/verify"><button type="button" class="btn btn-lg btn-dark download-btn"
                        onclick="window.location.href='http://localhost:3000/verify';"
                    > Verify product</button></a>
                </div>


                <div class="col-md-6 head-right">
                    <img class="home-img" src={gif} className="title-img" alt="gif"></img>
                </div>


            </div>



            {/* coursel */}

            <Carousel fade>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={p1}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3> Increase the brand value</h3>
                        {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={p2}
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>QR code for authenticating</h3>
                        {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={p3}
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Provide security to the clients</h3>
                        {/* <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p> */}
                    </Carousel.Caption>
                </Carousel.Item>

            </Carousel>


            <div >
                {/* cards */}
                <br />
                <div class="newline">


                    <div class="row">
                        <div class="col-sm-6">
                            <div class="card crd">
                                <div class="card-body">
                                    <h5 class="card-title">To detect counterfeit products</h5>
                                    <p class="card-text"> To ensures traceability of
                                        a product.It uses QR code for authenticating the product originality that shows the details of the for product.</p>
                                    <a href="http://localhost:3000/" class="btn btn-primary">Verify</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="card crd">
                                <div class="card-body">
                                    <h5 class="card-title">Manufactuter adds brands products</h5>
                                    <p class="card-text">This is how the manufacturer is
                                        able to prove their product is authentic and thus fake product can be detected easily.
                                    </p>
                                    <a href="http://localhost:3000/add" class="btn btn-primary">Add product</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* counter */}
                <div class="wrapper wrap">
                    <div class="counter col_fourth cnt">
                        <i class="fa fa-code fa-2x"></i>
                        <h2 class="timer count-title count-number" data-to="200" data-speed="1500"></h2>
                        <p class="count-text ">Users</p>
                    </div>

                    <div class="counter col_fourth cnt">
                        <i class="fa fa-coffee fa-2x"></i>
                        <h2 class="timer count-title count-number" data-to="100" data-speed="1500"></h2>
                        <p class="count-text ">Products added successfully</p>
                    </div>

                    <div class="counter col_fourth cnt">
                        <i class="fa fa-lightbulb-o fa-2x"></i>
                        <h2 class="timer count-title count-number" data-to="119" data-speed="1500"></h2>
                        <p class="count-text ">Customers verified product</p>
                    </div>


                </div>




            </div>

        </div>


    )


}

export default Home;