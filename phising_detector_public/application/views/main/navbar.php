<nav class="navbar navbar-expand-lg justify-content-center navbar-dark bg-dark" style="border-bottom:1px solid #ececec;">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
</a>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item px-2">
              <img src="<?= base_url()?>/assets/foto/logo_phising.svg" width="180px" style="top:6px;position:relative;">
          </li>
          <li class="nav-item px-2">
            <a class="nav-link" href="<?= base_url()?>"data-toggle="tooltip" title="Home" >Scan</a>
          </li>
          <li class="nav-item px-2">
            <a class="nav-link" href="<?= base_url()?>task" data-toggle="tooltip" title="Scan" >Task History <span class="badge badge-primary">New</span></a>
          </li>
          <li class="nav-item px-2">
            <a class="nav-link" href="<?= base_url()?>phising" data-toggle="tooltip" title="Phising">Phishing</a>
          </li>
          <li class="nav-item px-2">
            <a class="nav-link"  href="<?= base_url()?>legitimate"  data-toggle="tooltip" title="Legitimate">Legitimate</a>
          </li>
          <li class="nav-item px-2">
            <a class="nav-link" href="<?= base_url()?>dataset" data-toggle="tooltip" title="Scan" >Dataset</a>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li class="nav-item px-2"><a class="nav-link" href="#"><span class="badge badge-warning">v1.0</span></a></li>
        </ul>
    </div>
</nav>