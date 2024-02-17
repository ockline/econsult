	<div id="hs-basic-modal" className="hs-overlay ti-modal hidden">
								<div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out sm:!max-w-6xl">
									<div className="ti-modal-content">
										<div className="ti-modal-header">
											<h3 className="ti-modal-title invoice-title"> Update Practical Test</h3>
											<button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#hs-basic-modal">
												<span className="sr-only">Close</span>
											<i className="ti ti-x"></i>
											</button>
										</div>
										<div className="ti-modal-body p-6">
											
										
											<div className="grid lg:grid-cols-2 gap-6">
                                            <h3 className="font-semibold text-lg">Practical Test 1:</h3>
                                            <br/>
										<div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Test Number <span style={{ color: "red" }}> *</span></label>
                                           <Creatable classNamePrefix="react-select" name="practical_test_id" options={PracticalTest} onChange={(selectedOption) => handlePracticalInputChange(["practical_test_id"], selectedOption ? selectedOption.value : null)} value={PracticalTest.find((option) => option.value === practical.practical_test_id)} />
                                              {/* <span className="text-danger">{technicalData.error_list.practical_test_id}</span> */}
                                </div> 
									<div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Test Marks</label>
                                            <input type="number" className="my-auto ti-form-input" placeholder="Marks" name="test_marks"  value={practical.test_marks}
                                                    onChange={(e) => handlePracticalInputChange('test_marks', e.target.value)} />
                                                 {/* <span className="text-danger">{practical.error_list.test_marks}</span> */}
                                        </div> 
										<div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Test Ranking  <span style={{ color: "red" }}> *</span></label>
                                           <Creatable classNamePrefix="react-select" name="ranking_creterial_id" options={rankings} onChange={(selectedOption) => handlePracticalInputChange(["ranking_creterial_id"], selectedOption ? selectedOption.value : null)} value={rankings.find((option) => option.value === practical.ranking_creterial_id)} />
                                </div> 
								<div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Test Comment</label>
                                            <input type="text" className="my-auto ti-form-input" placeholder="Relevant Technical Experience  Comment" name="practicl_test_remark"  value={practical.practicl_test_remark}
                                            onChange={(e) => handlePracticalInputChange('practicl_test_remark', e.target.value)}  />
                                        </div> 		
													
						         	<div className=" float-right">
												<button type="button"
													className="hs-dropdown-toggle ti-btn ti-border font-medium bg-warning text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:ring-offset-white focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-white dark:focus:ring-offset-white/10"
													data-hs-overlay="#task-compose">
													Close
												</button>
											
                                        <button
											type="button"
											className="ti-btn ti-btn-primary show-example-btn"
											aria-label="Save Changes! Example: End of contract"
											id="ajax-btn"  
											onClick={(e) => SavePracticalTest(e,practical)}><i className="ti ti-send"></i>save   
                                        </button>
                                        
                                            </div>
                                            </div>
                         
                                        <hr className="pb-5 dark:border-t-white/10" />
                                        <div className="grid lg:grid-cols-2 gap-6">
                                            <h3 className="font-semibold text-lg">Practical Test 2:</h3>
                                            <br/>
										<div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Test Number <span style={{ color: "red" }}> *</span></label>
                                           <Creatable classNamePrefix="react-select" name="practical_test_id" options={PracticalTest} onChange={(selectedOption) => handlePracticalInputChange(["practical_test_id"], selectedOption ? selectedOption.value : null)} value={PracticalTest.find((option) => option.value === practical.practical_test_id)} />
                                              {/* <span className="text-danger">{technicalData.error_list.practical_test_id}</span> */}
                                </div> 
									<div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Test Marks</label>
                                            <input type="number" className="my-auto ti-form-input" placeholder="Marks" name="test_marks"  value={practical.test_marks}
                                                    onChange={(e) => handlePracticalInputChange('test_marks', e.target.value)} />
                                                 {/* <span className="text-danger">{practical.error_list.test_marks}</span> */}
                                        </div> 
										<div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Test Ranking  <span style={{ color: "red" }}> *</span></label>
                                           <Creatable classNamePrefix="react-select" name="ranking_creterial_id" options={rankings} onChange={(selectedOption) => handlePracticalInputChange(["ranking_creterial_id"], selectedOption ? selectedOption.value : null)} value={rankings.find((option) => option.value === practical.ranking_creterial_id)} />
                                </div> 
								<div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Test Comment</label>
                                            <input type="text" className="my-auto ti-form-input" placeholder="Relevant Technical Experience  Comment" name="practicl_test_remark"  value={practical.practicl_test_remark}
                                            onChange={(e) => handlePracticalInputChange('practicl_test_remark', e.target.value)}  />
                                        </div> 		
													
						         	<div className=" float-right">
												<button type="button"
													className="hs-dropdown-toggle ti-btn ti-border font-medium bg-warning text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:ring-offset-white focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-white dark:focus:ring-offset-white/10"
													data-hs-overlay="#task-compose">
													Close
												</button>
											
                                        <button
											type="button"
											className="ti-btn ti-btn-primary show-example-btn"
											aria-label="Save Changes! Example: End of contract"
											id="ajax-btn"  
											onClick={(e) => SavePracticalTest(e,practical)}><i className="ti ti-send"></i>save   
                                        </button>
                                        
                                            </div>
                                            </div>
                         
                                        	<hr className="pb-5 dark:border-t-white/10" />
											<div className="grid lg:grid-cols-2 gap-6">
                                            <h3 className="font-semibold text-lg">Practical Test 1:</h3>
                                            <br/>
										<div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Test Number <span style={{ color: "red" }}> *</span></label>
                                           <Creatable classNamePrefix="react-select" name="practical_test_id" options={PracticalTest} onChange={(selectedOption) => handlePracticalInputChange(["practical_test_id"], selectedOption ? selectedOption.value : null)} value={PracticalTest.find((option) => option.value === practical.practical_test_id)} />
                                              {/* <span className="text-danger">{technicalData.error_list.practical_test_id}</span> */}
                                </div> 
									<div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Test Marks</label>
                                            <input type="number" className="my-auto ti-form-input" placeholder="Marks" name="test_marks"  value={practical.test_marks}
                                                    onChange={(e) => handlePracticalInputChange('test_marks', e.target.value)} />
                                                 {/* <span className="text-danger">{practical.error_list.test_marks}</span> */}
                                        </div> 
										<div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Test Ranking  <span style={{ color: "red" }}> *</span></label>
                                           <Creatable classNamePrefix="react-select" name="ranking_creterial_id" options={rankings} onChange={(selectedOption) => handlePracticalInputChange(["ranking_creterial_id"], selectedOption ? selectedOption.value : null)} value={rankings.find((option) => option.value === practical.ranking_creterial_id)} />
                                </div> 
								<div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Test Comment</label>
                                            <input type="text" className="my-auto ti-form-input" placeholder="Relevant Technical Experience  Comment" name="practicl_test_remark"  value={practical.practicl_test_remark}
                                            onChange={(e) => handlePracticalInputChange('practicl_test_remark', e.target.value)}  />
                                        </div> 		
													
						         	<div className=" float-right">
												<button type="button"
													className="hs-dropdown-toggle ti-btn ti-border font-medium bg-warning text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:ring-offset-white focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-white dark:focus:ring-offset-white/10"
													data-hs-overlay="#task-compose">
													Close
												</button>
											
                                        <button
											type="button"
											className="ti-btn ti-btn-primary show-example-btn"
											aria-label="Save Changes! Example: End of contract"
											id="ajax-btn"  
											onClick={(e) => SavePracticalTest(e,practical)}><i className="ti ti-send"></i>save   
                                        </button>
                                        
                                            </div>
                                            </div>
                         
                                        	{/* <hr className="pb-5 dark:border-t-white/10" /> */}
                                    </div>
                                   
										<div className="ti-modal-footer sm:flex !block space-y-2 text-end">
											<Link className="ti-btn ti-btn-primary" to="#">
												<i className="ri-save-line"></i>Save changes
											</Link>
											<Link className="ti-btn ti-btn-secondary" to="#">
												<i className="ri-send-plane-line"></i> Send Invoice
											</Link>
											<Link className="ti-btn ti-btn-danger" to="#">
												<i className="ri-download-cloud-2-line"></i> Download
											</Link>
										</div>
									</div>
								</div>
						</div>