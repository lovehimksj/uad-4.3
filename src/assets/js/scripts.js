

  /*
  NOTE:
  ------
  PLACE HERE YOUR OWN JAVASCRIPT CODE IF NEEDED
  WE WILL RELEASE FUTURE UPDATES SO IN ORDER TO NOT OVERWRITE YOUR JAVASCRIPT CODE PLEASE CONSIDER WRITING YOUR SCRIPT HERE.  */

  // open loader
    function loaderOn () {
        $(".progress-loader").addClass('loader-active');
    }
    // close loader
    function loaderOff () {
      $(".progress-loader").removeClass('loader-active');
    }
    // sync campaign
    function sync () {
        loaderOn();
        setTimeout(function(){ loaderOff();}, 3000);
    }