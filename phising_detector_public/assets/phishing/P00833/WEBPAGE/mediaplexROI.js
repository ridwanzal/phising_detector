// *****************************************************************
// mediaplexROI.js -- Implement the JavaScript portion of static
//                    MediaPlex 1x1 pixel request consistently
//                    with more complex JavaScript, but less
//                    involved quoting (which is subject to 
//                    breakage).
// *****************************************************************

function ROItag(CustEventId, TagName, roiNVPairs) {

  // ARGUMENTS SHOULD BE PASSED AS STRINGS

  // *** always present ***
  // CustEventId: value assigned by Mediaplex, which appears to be some manner of
  //              Customer and project and specific event ids
  //
  // TagName: A Wells Fargo provided to Mediaplex mneumonic for reporting purposes
  //
  //          CCR 01116: Rather than hardcoding a value of 1, accept as part of the
  //          2nd parameter.
  //          Becomes 'COL05PG1=1' or 'COL05PG1=0'
  //
  // *** optionally present ***
  // roiNVPairs: Wells Fargo provided to Mediaplex for additional reporting purposes
  //
  //             (CCR 01116): implement Unique_ID=<wfacookie-value> as roiNVPairs
  //
  //

  // -------------- initialize variables/objects --------------------

  mpt = new Date(); // pseudo unique id -- see Mediaplex documents for discussion

  mediapleximgreq = ""; // initialize to nothing for future concatenation

  servingprotocol = location.protocol; // auto determine http: vs https:

  adserver = '//adfarm.mediaplex.com/ad/bk/'; // apparently constant

  imgAttributes = ' border="0" height="1" width="1" alt="">'; // rest of image tag

  // We only need the fake unique id if we are not given one!
  if ( roiNVPairs && (roiNVPairs.indexOf('Unique_ID') > -1) ) {
    // We have roiNVPairs AND one of the nv pairs was Unique_ID
    pseudoUniqueId = "";
  } else {
    // We either don't have roiNVPairs OR Unique_ID wasn't in the list 
    pseudoUniqueId = 'mpt=' + mpt.getTime() + "-" + mpt.getTimezoneOffset();
  }

  // --------------- build us a tag -----------------------------------
  if ( (CustEventId != null) && (TagName != null)) {
    // start building the image tag needed

    mediapleximgreq = '<img src="';
    mediapleximgreq += servingprotocol+adserver;
    mediapleximgreq += CustEventId + '?';
    mediapleximgreq += TagName;
    if (pseudoUniqueId) {
      mediapleximgreq +=  '&' + pseudoUniqueId;
    }

    if (roiNVPairs) {
      mediapleximgreq += '&' + roiNVPairs;
    }

    mediapleximgreq += '"  ' + imgAttributes;

  } else {
    // if we don't have the required stuff write nothing
    mediapleximgreq = "<!-- Not enough information to write tag -->";
  }

  //alert(mediapleximgreq);
  document.write(mediapleximgreq);

  return;
}
