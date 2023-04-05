import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingMovieDetailComponent } from './trendingMovie-detail.component';

describe('TrendingMovieDetailComponent', () => {
  let component: TrendingMovieDetailComponent;
  let fixture: ComponentFixture<TrendingMovieDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrendingMovieDetailComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TrendingMovieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
